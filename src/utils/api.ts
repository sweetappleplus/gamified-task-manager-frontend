import { AxiosError } from "axios";
import { ApiResponse } from "types";

export const getErrorMessage = (error: unknown, fallback: string): string => {
  const axiosError = error as AxiosError<ApiResponse>;
  return axiosError.response?.data?.message || fallback;
};
