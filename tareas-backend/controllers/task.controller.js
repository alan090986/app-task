import { db } from "../config/db.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.userId;

  try {
    const [results] = await db.execute(
      "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)",
      [userId, title, description]
    );
    res.status(201).json({ id: results.insertId, title, description });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

export const deleteTask = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM tasks WHERE id = ? AND user_id = ?", [id, userId]);
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};

export const updateTask = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await db.execute(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?",
      [title, description, id, userId]
    );
    res.json({ message: "Tarea actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
};
