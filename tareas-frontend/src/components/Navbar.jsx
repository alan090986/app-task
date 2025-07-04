import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const UserInfo = () =>
    user && (
      <>
        <span className="text-white font-semibold">👋 Hola, {user.nombre}</span>
        <button
          className="bg-white text-gray-800 rounded-full px-4 py-2 hover:bg-gray-100"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </>
    );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-green-600 p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">App de Tareas</h1>

        <div className="md:flex items-center space-x-4 hidden">
          <UserInfo />
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && user && (
        <div className="md:hidden mt-2 space-y-2">
          <UserInfo />
        </div>
      )}
    </nav>
  );
}
