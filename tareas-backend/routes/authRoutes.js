import express from 'express';
import { registrarUsuario, loginUsuario, verificarToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.Middleware.js';

const router = express.Router();

// Ruta para registrar nuevos usuarios
router.post('/register', registrarUsuario);

// Ruta para iniciar sesión y obtener el token JWT
router.post('/login', loginUsuario);

// Ruta protegida para verificar el token y obtener datos del usuario
router.get('/verify', authMiddleware, verificarToken);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nombre, email FROM users WHERE id = ?", [req.userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error del servidor" });
  }
});
export default router;
