export const API_URL = process.env.REACT_APP_API_URL;

export const API_URL_AUTH_SEND_OTP = "/auth/send-otp";
export const API_URL_AUTH_VERIFY_OTP = "/auth/verify-otp";
export const API_URL_AUTH_REFRESH = "/auth/refresh";
export const API_URL_AUTH_LOGOUT = "/auth/logout";

export const PUBLIC_ENDPOINTS = [
  API_URL_AUTH_SEND_OTP,
  API_URL_AUTH_VERIFY_OTP,
  API_URL_AUTH_REFRESH,
];
