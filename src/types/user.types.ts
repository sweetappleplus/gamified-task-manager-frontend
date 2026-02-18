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
  avatarUrl?: string | null;
  role: UserRole;
  isActive?: boolean;
  earning?: string;
  balance?: string;
  lastLoginAt?: string | null;
  createdAt?: string;
  level?: UserLevel;
};

export type UserSortBy =
  | "createdAt"
  | "email"
  | "name"
  | "earning"
  | "balance"
  | "lastLoginAt";
export type UserSortOrder = "asc" | "desc";

export type FilterUsersParams = {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: UserSortBy;
  sortOrder?: UserSortOrder;
};
