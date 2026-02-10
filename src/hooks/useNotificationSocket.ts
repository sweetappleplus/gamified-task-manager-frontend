import { useEffect, useRef } from "react";
import axios from "axios";
import { useToast } from "./useToast";
import {
  connectSocket,
  disconnectSocket,
  reconnectSocket,
} from "services/socket";
import { markNotificationAsReadApi } from "services/api";
import {
  getAccessToken,
  getRefreshToken,
  getTokenExpiryMs,
  setTokens,
  clearTokens,
} from "utils";
import { useAppSelector } from "app/hooks";
import {
  ApiResponse,
  AuthResponse,
  Notification,
  NOTIFICATION_TYPES,
} from "types";
import { ToastVariant } from "components";
import { API_URL, API_URL_AUTH_REFRESH, ROUTES } from "consts";

const getToastVariant = (type: Notification["type"]): ToastVariant => {
  switch (type) {
    case NOTIFICATION_TYPES.TASK_APPROVED:
    case NOTIFICATION_TYPES.PAYMENT_RECORDED:
      return "success";
    case NOTIFICATION_TYPES.TASK_REJECTED:
      return "error";
    case NOTIFICATION_TYPES.TASK_ASSIGNED:
    case NOTIFICATION_TYPES.TASK_SUBMITTED:
      return "warning";
    default:
      return "info";
  }
};

export const useNotificationSocket = () => {
  const { showToast } = useToast();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      return;
    }

    const token = getAccessToken();
    if (!token) {
      return;
    }

    const socket = connectSocket();

    const handleNotification = (notification: Notification) => {
      showToastRef.current({
        variant: getToastVariant(notification.type),
        message: notification.message,
        autoHideDuration: 5000,
        onClickCloseButton: () => {
          markNotificationAsReadApi(notification.id).catch(() => {});
        },
      });
    };

    const handleConnectError = async () => {
      const currentToken = getAccessToken();
      const expiryMs = currentToken ? getTokenExpiryMs(currentToken) : null;
      const isExpired = !expiryMs || expiryMs <= Date.now();

      if (!isExpired) {
        showToastRef.current({
          variant: "error",
          message: "Real-time notifications unavailable. Retrying...",
          autoHideDuration: 4000,
        });
        return;
      }

      if (isRefreshingRef.current) return;
      isRefreshingRef.current = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        isRefreshingRef.current = false;
        clearTokens();
        window.location.href = ROUTES.LOGIN.path;
        return;
      }

      try {
        const response = await axios.post<ApiResponse<AuthResponse>>(
          `${API_URL}${API_URL_AUTH_REFRESH}`,
          { refreshToken }
        );
        const data = response.data.data;
        if (data) {
          setTokens(data.accessToken, data.refreshToken);
          reconnectSocket();
        }
      } catch {
        clearTokens();
        window.location.href = ROUTES.LOGIN.path;
      } finally {
        isRefreshingRef.current = false;
      }
    };

    socket.on("notification", handleNotification);
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("connect_error", handleConnectError);
      disconnectSocket();
    };
  }, [isAuthenticated]);
};
