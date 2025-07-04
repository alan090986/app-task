import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 Añadido

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    const { userId, token } = res.data;

    setUserId(userId);
    setToken(token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
  };
  
  const register = async (nombre, email, password) => {
    await api.post("/register", { nombre, email, password }); 
  };
  
  const logout = () => {
    setUserId(null);
    setToken(null);
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await api.get("/me", {
          headers: {
          Authorization: `Bearer ${token}`,
           },
        });
         
          setUser(res.data);
          
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ userId, user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
