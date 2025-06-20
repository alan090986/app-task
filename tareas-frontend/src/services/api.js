import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor para enviar el Token en cada request protegido
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Añadir Token al header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
