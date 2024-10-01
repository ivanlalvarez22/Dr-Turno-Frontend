import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(authContext);

  // Verifica si hay un usuario autenticado (si user está definido)
  if (!user) {
    // Si no hay usuario autenticado, renderiza los children (componentes hijos)
    return children;
  }

  // Si hay un usuario autenticado, redirige a la página de inicio
  return <Navigate to="/" replace={true} />;
};

export default PublicRoute;
