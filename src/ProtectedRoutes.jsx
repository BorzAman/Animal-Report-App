import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import Buffer from "./buffer.jsx";

function ProtectedRoutes() {
  const { user, loading } = useAuth();

  if (loading) return <Buffer />;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

    return <Outlet />;
}

export default ProtectedRoutes;
