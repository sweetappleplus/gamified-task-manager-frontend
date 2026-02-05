import { api } from "./axios.instance";
import {
  ApiResponse,
  AuthResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  RefreshTokenRequest,
  LogoutRequest,
} from "types";
import {
  API_URL_AUTH_SEND_OTP,
  API_URL_AUTH_VERIFY_OTP,
  API_URL_AUTH_REFRESH,
  API_URL_AUTH_LOGOUT,
} from "consts";

export const sendOtpApi = (data: SendOtpRequest): Promise<ApiResponse> => {
  return api
    .post<ApiResponse>(API_URL_AUTH_SEND_OTP, data)
    .then((res) => res.data);
};

export const verifyOtpApi = (
  data: VerifyOtpRequest
): Promise<ApiResponse<AuthResponse>> => {
  return api
    .post<ApiResponse<AuthResponse>>(API_URL_AUTH_VERIFY_OTP, data)
    .then((res) => res.data);
};

export const refreshTokenApi = (
  data: RefreshTokenRequest
): Promise<ApiResponse<AuthResponse>> => {
  return api
    .post<ApiResponse<AuthResponse>>(API_URL_AUTH_REFRESH, data)
    .then((res) => res.data);
};

export const logoutApi = (data: LogoutRequest): Promise<ApiResponse> => {
  return api
    .post<ApiResponse>(API_URL_AUTH_LOGOUT, data)
    .then((res) => res.data);
};
