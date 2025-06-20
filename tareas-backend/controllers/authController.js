import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Registrar nuevo usuario
export const registrarUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existe] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ message: 'El usuario ya está registrado.' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar en la base de datos
    await pool.query('INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)', [
      nombre,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const usuario = result[0];
    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    const token = generarToken(usuario.id);
    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
};

// Verificar token
export const verificarToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Token válido', id: decoded.id });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.' });
  }
};
