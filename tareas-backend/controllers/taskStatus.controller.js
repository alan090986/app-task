// controllers/taskStatus.controller.js
import db from "../config/db.js";

export const getTaskStatuses = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name FROM task_status WHERE user_id = ?",
      [req.userId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estados" });
  }
};
