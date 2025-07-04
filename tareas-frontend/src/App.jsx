import { useState, useEffect, useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Task from "./pages/task";
import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AppContent({ theme }) {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={theme}>
      <Navbar />
      <Routes>
        {/* Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Task />} />

        {/* Privadas */}
        <Route
          path="/"
          element={
          <PrivateRoute>
        <Task />
        </PrivateRoute>
  }
/>


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <AppContent theme={theme} />
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="bg-gray-800 text-white rounded-full p-3 shadow-lg"
            title={theme === "light" ? "Modo Oscuro" : "Modo Claro"}
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
}
