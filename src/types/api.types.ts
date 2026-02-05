import { AxiosError } from "axios";
import { API_STATUSES } from "consts";

export type ApiStatus = (typeof API_STATUSES)[keyof typeof API_STATUSES];

export type ApiResponse<T = void> = {
  status: ApiStatus;
  message: string;
  data?: T;
  timestamp: string;
};

// Response interceptor: handle 401 with token refresh
export type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
};
