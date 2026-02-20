export const API_URL = process.env.REACT_APP_API_URL;
export const BACKEND_URL = API_URL?.replace(/\/api$/, "") ?? "";

export const API_URL_AUTH_SEND_OTP = "/auth/send-otp";
export const API_URL_AUTH_VERIFY_OTP = "/auth/verify-otp";
export const API_URL_AUTH_REFRESH = "/auth/refresh";
export const API_URL_AUTH_LOGOUT = "/auth/logout";

export const API_URL_NOTIFICATIONS = "/notifications";
export const API_URL_NOTIFICATIONS_MARK_AS_READ = "/notifications/:id/read";
export const API_URL_NOTIFICATIONS_MARK_ALL_READ =
  "/notifications/mark-all-read";
export const API_URL_NOTIFICATIONS_UNREAD_COUNT = "/notifications/unread-count";
export const API_URL_NOTIFICATIONS_CREATE = "/notifications";
export const API_URL_NOTIFICATIONS_ADMIN = "/notifications/admin";
export const API_URL_NOTIFICATIONS_ADMIN_BY_ID = "/notifications/admin/:id";
export const API_URL_NOTIFICATIONS_ADMIN_BULK_DELETE =
  "/notifications/admin/bulk-delete";

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
export const API_URL_TASKS_START = "/tasks/:id/start";
export const API_URL_TASKS_SUBMIT = "/tasks/:id/submit";
export const API_URL_TASKS_CANCEL = "/tasks/:id/cancel";
export const API_URL_TASKS_FILES = "/tasks/:id/files";
export const API_URL_TASKS_FILE_BY_ID = "/tasks/:id/files/:fileId";
export const API_URL_TASKS_BULK_CREATE = "/tasks/bulk-create";
export const API_URL_TASKS_BULK_ASSIGN = "/tasks/bulk-assign";

export const API_URL_LEDGER_ENTRIES_ADMIN = "/ledger-entries/admin";
export const API_URL_LEDGER_ENTRIES_ADMIN_SUMMARY =
  "/ledger-entries/admin/summary";
export const API_URL_LEDGER_ENTRIES_ADMIN_MARK_PAID =
  "/ledger-entries/admin/:id/mark-paid";
export const API_URL_LEDGER_ENTRIES_ADMIN_MARK_UNPAID =
  "/ledger-entries/admin/:id/mark-unpaid";
export const API_URL_LEDGER_ENTRIES_ADMIN_BULK_MARK_PAID =
  "/ledger-entries/admin/bulk-mark-paid";

export const API_URL_ACTIVITY_LOGS = "/activity-logs";

export const API_URL_USERS = "/users";
export const API_URL_USERS_ME = "/users/me";
export const API_URL_USERS_STATUS = "/users/:id/status";

export const PUBLIC_ENDPOINTS = [
  API_URL_AUTH_SEND_OTP,
  API_URL_AUTH_VERIFY_OTP,
  API_URL_AUTH_REFRESH,
];

export const API_STATUSES = {
  SUCCESS: "success",
  FAILURE: "failure",
} as const;
