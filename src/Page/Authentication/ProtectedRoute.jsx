import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/authentication" />;
};

export default ProtectedRoute;
