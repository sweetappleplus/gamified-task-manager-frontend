export const API_URL = process.env.REACT_APP_API_URL;

export const API_URL_AUTH_SEND_OTP = "/auth/send-otp";
export const API_URL_AUTH_VERIFY_OTP = "/auth/verify-otp";
export const API_URL_AUTH_REFRESH = "/auth/refresh";
export const API_URL_AUTH_LOGOUT = "/auth/logout";

export const API_URL_NOTIFICATIONS_MARK_AS_READ = "/notifications/:id/read";

export const API_URL_TASK_CATEGORIES = "/task-categories";
export const API_URL_TASK_CATEGORIES_BY_ID = "/task-categories/:id";

export const API_URL_SYSTEM_SETTINGS = "/system-settings";
export const API_URL_SYSTEM_SETTINGS_BY_KEY = "/system-settings/:key";

export const API_URL_LEVEL_CONFIGS = "/level-configs";
export const API_URL_LEVEL_CONFIGS_BY_ID = "/level-configs/:id";

export const PUBLIC_ENDPOINTS = [
  API_URL_AUTH_SEND_OTP,
  API_URL_AUTH_VERIFY_OTP,
  API_URL_AUTH_REFRESH,
];

export const API_STATUSES = {
  SUCCESS: "success",
  FAILURE: "failure",
} as const;
