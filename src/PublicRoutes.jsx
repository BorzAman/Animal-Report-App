import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";

const PublicRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-gray-400">Loading…</div>;
  }

  // If logged in → go to home
  return user ? <Navigate to="/home" replace /> : <Outlet />;
};

export default PublicRoutes;
