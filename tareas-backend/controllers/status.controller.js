import db from "../config/db.js"; // o "../db.js", depende de tu estructura

export const getStatuses = async (req, res) => {
  const userId = req.userId;

  try {
    const [statuses] = await db.execute(
      "SELECT id, name FROM task_status WHERE user_id = ?",
      [userId]
    );
    res.json(statuses);
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    res.status(500).json({ error: "Error al obtener los estados" });
  }
};

export const createStatus = async (req, res) => {
  const userId = req.userId;
  const { name } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO task_status (user_id, name) VALUES (?, ?)",
      [userId, name]
    );
    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error("Error al crear estado:", error);
    res.status(500).json({ error: "Error al crear el estado" });
  }
};

export const getTaskStatuses = async (req, res) => {
  const userId = req.userId;

  try {
    const [statuses] = await db.execute(
      "SELECT id, name FROM task_status WHERE user_id = ?",
      [userId]
    );
    res.json(statuses);
  } catch (error) {
    console.error("Error al obtener task statuses:", error);
    res.status(500).json({ error: "Error al obtener los estados" });
  }
};
