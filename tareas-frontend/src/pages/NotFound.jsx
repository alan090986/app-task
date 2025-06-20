import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mb-4">Página no encontrada</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
