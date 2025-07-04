import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react"; // iconos para editar y eliminar


export default function Task() {
  const { token } = useContext(AuthContext);
  const [tareas, setTareas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [statusId, setStatusId] = useState("");


  useEffect(() => {
    if (!token) return setTareas([]);
    const fetchTareas = async () => {
      try {
        const res = await api.get("/tasks");
        setTareas(res.data);
      } catch (error) {
        console.error("Error al obtener tareas:", error);
      }
    };
    fetchTareas();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("El título es obligatorio");

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, { title, description });
        setTareas((prev) =>
          prev.map((t) =>
            t.id === editingId ? { ...t, title, description } : t
          )
        );
        setEditingId("");
      } else {
        const res = await api.post("/tasks", { title, description, status_id: statusId });
        setTareas((prev) => [...prev, res.data]);
      }
      setTitle("");
      setDescription("");
      setError("");
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }

  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (!confirm) return;

    try {
      await api.delete(`/tasks/${id}`);
      setTareas((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleEdit = (tarea) => {
    setTitle(tarea.title);
    setDescription(tarea.description);
    setEditingId(tarea.id);
  };

  const [estados, setEstados] = useState([]);

  useEffect(() => {
  async function fetchEstados() {
    const res = await api.get("/task-status");
    setEstados(res.data);
    }
    fetchEstados();
    }, []);

const handleChangeEstado = async (taskId, newStatusId) => {
  try {
    await api.patch(`/tasks/${taskId}/status`, { status_id: newStatusId }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    // Actualiza el estado local de las tareas
    setTareas((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status_id: newStatusId } : t
      )
    );
  } catch (error) {
    console.error("Error al cambiar el estado:", error);
  }
};




  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis Tareas</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className={`w-full rounded border p-2 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="w-full rounded border border-gray-300 p-2"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <select
  value={statusId}
  onChange={(e) => setStatusId(e.target.value)}
  className="w-full rounded border border-gray-300 p-2"
  required
>
  <option value="">Seleccionar estado</option>
  {estados.map((estado) => (
    <option key={estado.id} value={estado.id}>
      {estado.name}
    </option>
  ))}
</select>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
        >
          {editingId ? "Actualizar tarea" : "Añadir tarea"}
        </button>
        
      </form>

      <div className="mt-8 space-y-4">
        {tareas.length === 0 ? (
          <p className="text-gray-600">Aún no tienes tareas</p>
        ) : (
          <AnimatePresence>
            {tareas.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-100 rounded p-4 shadow flex flex-col"
              >
                <h3 className="font-bold">{t.title}</h3>
                <p>{t.description}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    <Pencil size={16} />Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                   <Trash2 size={16} />Eliminar
                  </button>
                </div>
                <select
                value={t.status_id || ""}
                onChange={(e) => handleChangeEstado(t.id, e.target.value)}
                className="mt-2 rounded border p-1"
                >
                <option value="">Seleccionar estado</option>
                 {estados.map((estado) => (
                 <option key={estado.id} value={estado.id}>
                {estado.name}
               </option>
               ))}
            </select>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
