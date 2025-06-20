import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "./db.js"; // Aquí importas tu conexión a MySQL
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecreto"; // Cambia a tu clave secreta

// --------------------------------------------------
// Registro de usuario
app.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (nombre, email, password) VALUES (?,?,?)",
    [nombre, email, hashedPassword],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: "Error al registrar usuario" });
      }
      res.json({ message: "Usuario registrado correctamente" });
    }
  );
});

// --------------------------------------------------
// Login de usuario
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send({ error: "Error al consultar usuario" });
      }

      if (results.length === 0) {
        return res
          .status(401)
          .send({ error: "Usuario no encontrado" });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ userId: user.id, token });
    }
  );
});

// --------------------------------------------------
// Middleware para verificar JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ error: "Sin token de autorización" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).send({ error: "Token no válido" });
  }
}

// --------------------------------------------------
// Ruta para obtener todas las tareas del usuario
app.get("/tasks", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM task WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Error al obtener tareas" });
      }
      res.json(results);
    }
  );
});

// --------------------------------------------------
// Ruta para crear una tarea
app.post("/tasks", authMiddleware, (req, res) => {
  const { title, description } = req.body;

  db.query(
    "INSERT INTO tasks (user_id, title, description) VALUES (?,?,?)",
    [req.userId, title, description],
    (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Error al crear la tarea" });
      }
      res.json({ message: "Tarea creada exitosamente" });
    }
  );
});

// --------------------------------------------------
// Ruta para eliminar una tarea
app.delete("/tasks/:id", authMiddleware, (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, req.userId],
    (err) => {
      if (err) {
        return res
          .status(500)
          .send({ error: "Error al eliminar la tarea" });
      }
      res.json({ message: "Tarea eliminada exitosamente" });
    }
  );
});

// --------------------------------------------------
// Inicia el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// --------------------------------------------------
app.get("/tasks", authMiddleware, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.userId],
    (err, results) => {
      if (err) {
        console.error("Error en GET /tasks:", err);
        return res.status(500).send({ error: "Error al obtener tareas" });
      }
      res.json(results);
    }
  );
});

