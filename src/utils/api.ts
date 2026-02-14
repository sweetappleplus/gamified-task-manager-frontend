import { AxiosError } from "axios";
import { ApiResponse } from "types";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<ApiResponse>;
  const message = axiosError.response?.data?.message;
  if (!message) return fallback;
  if (Array.isArray(message)) return message.join("\n");
  return message;
};
