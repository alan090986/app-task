import express from 'express';
import { registrarUsuario, loginUsuario, verificarToken } from '../controllers/authController.js';
import { protegerRuta } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para registrar nuevos usuarios
router.post('/register', registrarUsuario);

// Ruta para iniciar sesión y obtener el token JWT
router.post('/login', loginUsuario);

// Ruta protegida para verificar el token y obtener datos del usuario
router.get('/verify', protegerRuta, verificarToken);

export default router;
