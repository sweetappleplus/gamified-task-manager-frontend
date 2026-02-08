import { useEffect, useRef } from "react";
import { useToast } from "./useToast";
import { connectSocket, disconnectSocket } from "services/socket";
import { markNotificationAsReadApi } from "services/api";
import { getAccessToken } from "utils";
import { useAppSelector } from "app/hooks";
import { Notification, NOTIFICATION_TYPES } from "types";
import { ToastVariant } from "components";

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

  useEffect(() => {
    if (!isAuthenticated) {
      disconnectSocket();
      return;
    }

    const token = getAccessToken();
    if (!token) {
      return;
    }

    const socket = connectSocket(token);

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

    const handleConnectError = () => {
      showToastRef.current({
        variant: "error",
        message: "Real-time notifications unavailable. Retrying...",
        autoHideDuration: 4000,
      });
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
