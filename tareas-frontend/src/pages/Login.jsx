import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/"); // Redirige al Home o Dashboard
    } catch {
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-80"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">
          
          <input
            {...register("email", { required: "Email requerido" })}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            {...register("password", { required: "Contraseña requerida" })}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Contraseña"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}

          <button className="w-full bg-blue-600 text-white rounded p-3 mt-2 hover:bg-blue-700">
            Entrar
          </button>
          <p className="text-center mt-4">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
               Regístrate aquí
             </a>
            </p>

        </form>
      </motion.div>
    </div>
  );
}
