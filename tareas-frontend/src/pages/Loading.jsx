import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 p-4">
      <h1 className="text-5xl font-bold">App de Tareas</h1>
      <p className="mt-4 text-lg text-gray-600">
        Organiza todas tus tareas de manera simple, rápida y eficaz.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 font-semibold"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/register"
          className="bg-gray-200 hover:bg-gray-300 rounded-full px-6 py-3 font-semibold"
        >
          Crear Cuenta
        </Link>
      </div>
    </div>
  );
}
