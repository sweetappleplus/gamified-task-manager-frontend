import { RouteConfig, ROUTE_ACCESS } from "types";
import UIKitPage from "pages/UIKit";
import LoginPage from "pages/Login";
import DashboardPage from "pages/Dashboard";

export const ROUTES: Record<string, RouteConfig> = {
  UI_KIT: {
    path: "/uikit",
    component: UIKitPage,
    access: ROUTE_ACCESS.PUBLIC,
  },
  LOGIN: {
    path: "/login",
    component: LoginPage,
    access: ROUTE_ACCESS.PUBLIC,
  },
  DASHBOARD: {
    path: "/dashboard",
    component: DashboardPage,
    access: ROUTE_ACCESS.PROTECTED,
  },
} as const;
