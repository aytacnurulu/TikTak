import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../shared/store/useAuthStore";
import { UserRole } from "../../../shared/types/admin.types";

export default function ProtectedRoute() {
  const { accessToken, isAuthenticated, profile } = useAuthStore();

  const isAdminUser =
    accessToken !== null && isAuthenticated && profile?.role === UserRole.ADMIN;

  if (!isAdminUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
