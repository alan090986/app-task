import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register: registerUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async ({ nombre, email, password }) => {
    try {
      await registerUser(nombre, email, password);
      navigate("/login"); // Redirige al login tras registro exitoso
    } catch {
      setErrorMessage("Error al registrarse, verifica los datos.");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-80"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center">Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3">

          <input
            {...register("nombre", { required: "Nombre requerido" })}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
            placeholder="Nombre"
            type="text"
          />
          {errors.nombre && (
            <span className="text-red-500 text-sm">{errors.nombre.message}</span>
          )}

          <input
            {...register("email", { required: "Email requerido" })}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <input
            {...register("password", { required: "Contraseña requerida" })}
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-purple-500"
            placeholder="Contraseña"
            type="password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}

          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}

          <button className="w-full bg-purple-600 text-white rounded p-3 mt-2 hover:bg-purple-700">
            Registrarse
          </button>
          <p className="text-center mt-4">
            Ya tengo cuenta{" "}
            <a href="/Login" className="text-blue-600 hover:underline">
               Iniciar sesión
             </a>
            </p>
        </form>
      </motion.div>
    </div>
  );
}
