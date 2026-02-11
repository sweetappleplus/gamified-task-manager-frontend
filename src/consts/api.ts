export const API_URL = process.env.REACT_APP_API_URL;
export const BACKEND_URL = API_URL?.replace(/\/api$/, "") ?? "";

export const API_URL_AUTH_SEND_OTP = "/auth/send-otp";
export const API_URL_AUTH_VERIFY_OTP = "/auth/verify-otp";
export const API_URL_AUTH_REFRESH = "/auth/refresh";
export const API_URL_AUTH_LOGOUT = "/auth/logout";

export const API_URL_NOTIFICATIONS_MARK_AS_READ = "/notifications/:id/read";
export const API_URL_NOTIFICATIONS_UNREAD_COUNT = "/notifications/unread-count";

export const API_URL_TASK_CATEGORIES = "/task-categories";
export const API_URL_TASK_CATEGORIES_BY_ID = "/task-categories/:id";

export const API_URL_SYSTEM_SETTINGS = "/system-settings";
export const API_URL_SYSTEM_SETTINGS_BY_KEY = "/system-settings/:key";

export const API_URL_LEVEL_CONFIGS = "/level-configs";
export const API_URL_LEVEL_CONFIGS_BY_ID = "/level-configs/:id";

export const API_URL_TASKS = "/tasks";
export const API_URL_TASKS_BY_ID = "/tasks/:id";
export const API_URL_TASKS_ASSIGN = "/tasks/:id/assign";
export const API_URL_TASKS_REVIEW = "/tasks/:id/review";
export const API_URL_TASKS_MARK_PAID = "/tasks/:id/mark-paid";
export const API_URL_TASKS_CANCEL = "/tasks/:id/cancel";
export const API_URL_TASKS_FILES = "/tasks/:id/files";

export const API_URL_USERS = "/users";

export const PUBLIC_ENDPOINTS = [
  API_URL_AUTH_SEND_OTP,
  API_URL_AUTH_VERIFY_OTP,
  API_URL_AUTH_REFRESH,
];

export const API_STATUSES = {
  SUCCESS: "success",
  FAILURE: "failure",
} as const;
