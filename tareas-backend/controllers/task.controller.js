// controllers/tasks.controller.js
import db from "../config/db.js";

// el resto del archivo permanece igual


export const createTask = async (req, res) => {
  const { title, description, status_id } = req.body;
  const userId = req.userId;

  try {
    const [results] = await db.execute(
      "INSERT INTO tasks (user_id, title, description, status_id) VALUES (?, ?, ?, ?)",
      [userId, title, description, status_id]
    );
    res.status(201).json({ id: results.insertId, title, description, status_id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const getTasks = async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await db.execute(
      `SELECT t.*, ts.name AS status_name
       FROM tasks t
       LEFT JOIN task_status ts ON t.status_id = ts.id
       WHERE t.user_id = ?`,
      [userId]
    );
  /*  const [rows] = await db.execute("SELECT * FROM tasks WHERE user_id = ?", [userId]);*/
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


export const updateTaskStatus = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { status_id } = req.body;

  try {
    await db.execute(
      "UPDATE tasks SET status_id = ? WHERE id = ? AND user_id = ?",
      [status_id, id, userId]
    );
    res.json({ message: "Estado de la tarea actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado de la tarea" });
  }
};

