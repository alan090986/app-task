import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import db from "./config/db.js"; // Aquí importas tu conexión a MySQL*/
import bcrypt from "bcrypt";
// server.js
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/task.routes.js";
import taskStatusRoutes from "./routes/status.routes.js";




dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/", userRoutes); // monta /me
app.use("/", authRoutes); // /register /login /verify
app.use("/tasks", taskRoutes);
app.use("/", taskStatusRoutes);
const JWT_SECRET = process.env.JWT_SECRET || "supersecreto"; // Cambia a tu clave secreta


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
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).send({ error: "Token no válido" });
  }
}

// --------------------------------------------------


// --------------------------------------------------
// Inicia el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// --------------------------------------------------

