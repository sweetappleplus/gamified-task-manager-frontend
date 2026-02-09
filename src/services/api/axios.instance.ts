import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  API_URL,
  API_URL_AUTH_REFRESH,
  PUBLIC_ENDPOINTS,
  ROUTES,
} from "consts";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "utils";
import { ApiResponse, AuthResponse, FailedRequest } from "types";

if (!API_URL) {
  throw new Error("API_URL is not set in the environment variables");
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Request interceptor: attach access token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: AxiosError | null, token: string | null): void => {
  failedQueue.forEach((req) => {
    if (error) {
      req.reject(error);
    } else if (token) {
      req.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((ep) =>
      originalRequest.url?.includes(ep)
    );

    // 403 Forbidden: user is authenticated but lacks permission
    if (error.response?.status === 403) {
      window.location.href = ROUTES.DASHBOARD.path;
      return Promise.reject(error);
    }

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isPublicEndpoint
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      window.location.href = ROUTES.LOGIN.path;
      return Promise.reject(error);
    }

    try {
      // Use raw axios to avoid triggering this interceptor recursively
      const response = await axios.post<ApiResponse<AuthResponse>>(
        `${API_URL}${API_URL_AUTH_REFRESH}`,
        { refreshToken }
      );
      const data = response.data.data;
      if (data) {
        setTokens(data.accessToken, data.refreshToken);
        processQueue(null, data.accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        }
        return api(originalRequest);
      }
      throw new Error("No data in refresh response");
    } catch (refreshError) {
      processQueue(refreshError as AxiosError, null);
      clearTokens();
      window.location.href = ROUTES.LOGIN.path;
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
