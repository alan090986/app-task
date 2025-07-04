// routes/user.routes.js
import { Router } from "express";
import db from "../config/db.js";

import { authMiddleware } from "../middleware/auth.Middleware.js";

const router = Router();

router.get("/me", authMiddleware, async (req, res) => {
  const [rows] = await db.query("SELECT id, nombre, email FROM users WHERE id = ?", [req.userId]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(rows[0]);
});


export default router;
