import jwt from 'jsonwebtoken';
import { pool } from '../db.js';

export const protegerRuta = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [result] = await pool.query('SELECT * FROM users WHERE id = ?', [decoded.id]);

    if (result.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.usuario = result[0];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
