import { ComponentType } from "react";
import LoginPage from "pages/Login";
import DashboardPage from "pages/Dashboard";

export interface RouteConfig {
  path: string;
  component: ComponentType;
}

export const ROUTES: Record<string, RouteConfig> = {
  LOGIN: {
    path: "/login",
    component: LoginPage,
  },
  DASHBOARD: {
    path: "/",
    component: DashboardPage,
  },
} as const;
