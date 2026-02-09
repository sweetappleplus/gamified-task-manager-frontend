import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "features/auth";
import { ProtectedRouteProps } from "types";
import { ROUTES } from "consts";

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const redirectParam = encodeURIComponent(
      location.pathname + location.search
    );
    return <Navigate to={`/login?redirect=${redirectParam}`} replace />;
  }

  if (roles && roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD.path} replace />;
  }

  return <>{children}</>;
};
