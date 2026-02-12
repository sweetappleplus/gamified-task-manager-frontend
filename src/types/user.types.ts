import { UserLevel } from "./level-config.types";

export const USER_ROLES = {
  WORKER: "WORKER",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type User = {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
  level?: UserLevel;
};

export type FilterUsersParams = {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
};
