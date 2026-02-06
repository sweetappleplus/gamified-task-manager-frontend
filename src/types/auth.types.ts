import { ComponentType } from "react";
import { User, UserRole } from "./user.types";

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type SendOtpRequest = {
  email: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type LogoutRequest = {
  refreshToken: string;
};

export type JwtPayload = {
  exp: number;
  id: string;
  email: string;
  role: UserRole;
};

export const ROUTE_ACCESS = {
  PUBLIC: "public",
  PROTECTED: "protected",
} as const;

export type RouteAccess = (typeof ROUTE_ACCESS)[keyof typeof ROUTE_ACCESS];

export interface RouteConfig {
  path: string;
  component: ComponentType;
  access?: RouteAccess;
  roles?: readonly UserRole[];
}

export type PublicRouteProps = {
  children: React.ReactNode;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
  roles?: readonly UserRole[];
};

export const LOGIN_STEPS = {
  EMAIL: "email",
  OTP: "otp",
} as const;

export type LoginStep = (typeof LOGIN_STEPS)[keyof typeof LOGIN_STEPS];
