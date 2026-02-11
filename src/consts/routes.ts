import { RouteConfig, ROUTE_ACCESS, USER_ROLES } from "types";
import { SidebarNavItemProps, FooterNavButtonProps } from "components";
import UIKitPage from "pages/UIKit";
import LoginPage from "pages/Login";
import PlaceholderPage from "pages/Placeholder";
import AdminPlaceholderPage from "pages/admin/Placeholder";
import TaskCategoriesPage from "pages/admin/TaskCategories";
import SystemSettingsPage from "pages/admin/SystemSettings";
import LevelConfigsPage from "pages/admin/LevelConfigs";
import AdminTasksPage from "pages/admin/Tasks";
import TasksPage from "pages/Tasks";

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
    component: PlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN, USER_ROLES.WORKER],
  },
  TASKS: {
    path: "/tasks",
    component: TasksPage,
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
    component: AdminPlaceholderPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  ADMIN_XP_SETTINGS: {
    path: "/admin/system-settings",
    component: SystemSettingsPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  ADMIN_TASK_CATEGORIES: {
    path: "/admin/task-categories",
    component: TaskCategoriesPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  ADMIN_LEVEL_CONFIGS: {
    path: "/admin/level-configs",
    component: LevelConfigsPage,
    access: ROUTE_ACCESS.PROTECTED,
    roles: [USER_ROLES.SUPER_ADMIN],
  },
  ADMIN_TASKS: {
    path: "/admin/tasks",
    component: AdminTasksPage,
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
    icon: "chart" as const,
    label: "Dashboard",
    route: ROUTES.ADMIN_DASHBOARD.path,
  },
  {
    icon: "document-text" as const,
    label: "System Settings",
    route: ROUTES.ADMIN_XP_SETTINGS.path,
  },
  {
    icon: "lists" as const,
    label: "Task Categories",
    route: ROUTES.ADMIN_TASK_CATEGORIES.path,
  },
  {
    icon: "file" as const,
    label: "Tasks",
    route: ROUTES.ADMIN_TASKS.path,
  },
  {
    icon: "star" as const,
    label: "Level Configs",
    route: ROUTES.ADMIN_LEVEL_CONFIGS.path,
  },
  {
    icon: "home" as const,
    label: "Home",
    route: ROUTES.DASHBOARD.path,
  },
] as const;
