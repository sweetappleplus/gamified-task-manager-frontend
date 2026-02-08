import { RouteConfig, ROUTE_ACCESS, USER_ROLES } from "types";
import { SidebarNavItemProps } from "components";
import UIKitPage from "pages/UIKit";
import LoginPage from "pages/Login";
import DashboardPage from "pages/Dashboard";
import PlaceholderPage from "pages/Placeholder";

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
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  TASKS: {
    path: "/tasks",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  CHATS: {
    path: "/chats",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  NOTIFICATIONS: {
    path: "/notifications",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  PROFILE: {
    path: "/profile",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  START_WORK: {
    path: "/start-work",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  ADMIN_DASHBOARD: {
    path: "/admin/dashboard",
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN],
  },
} as const;

export const getWorkerSidebarNavItems = (
  notificationCount?: number,
  chatCount?: number
): SidebarNavItemProps[] => [
  {
    icon: "home",
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: "lists",
    label: "Tasks",
    route: "/tasks",
  },
  {
    icon: "message",
    label: "Chats",
    route: "/chats",
    ...(chatCount !== undefined && chatCount > 0 ? { badge: chatCount } : {}),
  },
  {
    icon: "bell",
    label: "Notifications",
    route: "/notifications",
    ...(notificationCount !== undefined && notificationCount > 0
      ? { badge: notificationCount }
      : {}),
  },
  {
    icon: "user-square",
    label: "Profile",
    route: "/profile",
  },
  {
    icon: "rocket",
    label: "Start Work",
    route: "/start-work",
    variant: "highlighted",
  },
];
