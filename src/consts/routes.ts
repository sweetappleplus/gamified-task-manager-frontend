import { RouteConfig, ROUTE_ACCESS, USER_ROLES } from "types";
import { SidebarNavItemProps, FooterNavButtonProps } from "components";
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
  ADMIN_XP_SETTINGS: {
    path: "/admin/xp-settings",
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
    route: ROUTES.DASHBOARD.path,
  },
  {
    icon: "lists",
    label: "Tasks",
    route: ROUTES.TASKS.path,
  },
  {
    icon: "message",
    label: "Chats",
    route: ROUTES.CHATS.path,
    ...(chatCount !== undefined && chatCount > 0 ? { badge: chatCount } : {}),
  },
  {
    icon: "bell",
    label: "Notifications",
    route: ROUTES.NOTIFICATIONS.path,
    ...(notificationCount !== undefined && notificationCount > 0
      ? { badge: notificationCount }
      : {}),
  },
  {
    icon: "user-square",
    label: "Profile",
    route: ROUTES.PROFILE.path,
  },
  {
    icon: "rocket",
    label: "Start Work",
    route: ROUTES.START_WORK.path,
    variant: "highlighted",
  },
];

export const WORKER_FOOTER_NAV_ITEMS: FooterNavButtonProps[] = [
  {
    icon: "home",
    label: "Home",
    route: ROUTES.DASHBOARD.path,
  },
  {
    icon: "lists",
    label: "Tasks",
    route: ROUTES.TASKS.path,
  },
  {
    icon: "rocket",
    label: "Start",
    route: ROUTES.START_WORK.path,
    variant: "highlighted",
  },
  {
    icon: "message",
    label: "Chats",
    route: ROUTES.CHATS.path,
  },
  {
    icon: "user-square",
    label: "Profile",
    route: ROUTES.PROFILE.path,
  },
];

export const ADMIN_SIDEBAR_NAV_ITEMS = [
  {
    label: "Dashboard",
    route: ROUTES.ADMIN_DASHBOARD.path,
  },
  {
    label: "XP Setting",
    route: ROUTES.ADMIN_XP_SETTINGS.path,
  },
  {
    label: "Home",
    route: ROUTES.DASHBOARD.path,
  },
] as const;
