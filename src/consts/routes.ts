import { ComponentType } from "react";
import UIKitPage from "pages/UIKit";
import LoginPage from "pages/Login";
import DashboardPage from "pages/Dashboard";

export interface RouteConfig {
  path: string;
  component: ComponentType;
}

export const ROUTES: Record<string, RouteConfig> = {
  UI_KIT: {
    path: "/uikit",
    component: UIKitPage,
  },
  LOGIN: {
    path: "/login",
    component: LoginPage,
  },
  DASHBOARD: {
    path: "/dashboard",
    component: DashboardPage,
  },
} as const;
