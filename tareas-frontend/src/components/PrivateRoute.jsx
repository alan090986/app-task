// src/components/PrivateRoute.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
  const { userId } = useContext(AuthContext);
  if (!userId) {
    return <Navigate to="/login" />;
  }
  return children;
}
