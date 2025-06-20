import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api"; 

export default function Tareas() {
  const { token } = useContext(AuthContext);
  const [tareas, setTareas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchTareas() {
      if (!token) {
        setTareas([]);
        return;
      }
      try {
        const res = await api.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTareas(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTareas();
  }, [token]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await api.post(
        "/tasks",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Ahora sí obtenemos la tarea desde la respuesta en lugar de inventarla
      setTareas((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800">Mis Tareas</h2>
      <form onSubmit={handleAddTask} className="mt-4 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full rounded border p-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
        >
          Añadir tarea
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {tareas.length === 0 ? (
          <p className="text-gray-600">Aún no tienes tareas</p>
        ) : (
          tareas.map((t) => (
            <div
              key={t.id}
              className="bg-gray-100 rounded p-4 shadow flex flex-col"
            >
              <h3 className="font-bold">{t.title}</h3>
              <p>{t.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
