import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "consts";
import { useAuth } from "features/auth";
import { useNotificationSocket } from "hooks/useNotificationSocket";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { ROUTE_ACCESS } from "types";

const AppRoutes = () => {
  const { isAuthenticated, isInitialized, initializeAuth } = useAuth();

  useNotificationSocket();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />

      {Object.values(ROUTES).map((route) => {
        const Component = route.component;

        if (route.access === ROUTE_ACCESS.PROTECTED) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute roles={route.roles}>
                  <Component />
                </ProtectedRoute>
              }
            />
          );
        }

        if (route.access === ROUTE_ACCESS.PUBLIC) {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute>
                  <Component />
                </PublicRoute>
              }
            />
          );
        }

        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      })}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppRouter = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default AppRouter;
