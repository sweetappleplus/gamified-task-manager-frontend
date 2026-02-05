import { Navigate } from "react-router-dom";
import { useAuth } from "features/auth";
import { PublicRouteProps } from "types";

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
