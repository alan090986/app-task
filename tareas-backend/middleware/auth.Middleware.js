import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.userId = decoded.id;

    const [rows] = await db.query(
      "SELECT id FROM users WHERE id = ?",
      [req.userId]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Usuario no válido" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};




