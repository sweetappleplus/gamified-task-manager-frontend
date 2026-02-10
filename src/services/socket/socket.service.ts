import { io, Socket } from "socket.io-client";
import {
  API_URL,
  SOCKET_RECONNECTION_ATTEMPTS,
  SOCKET_RECONNECTION_DELAY_MS,
} from "consts";
import { getAccessToken } from "utils";

let socket: Socket | null = null;

const getSocketUrl = (): string => {
  const apiUrl = API_URL ?? "";
  return apiUrl.replace(/\/api\/?$/, "");
};

export const connectSocket = (): Socket => {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(getSocketUrl(), {
    auth: (cb) => {
      cb({ token: getAccessToken() ?? "" });
    },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: SOCKET_RECONNECTION_ATTEMPTS,
    reconnectionDelay: SOCKET_RECONNECTION_DELAY_MS,
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const reconnectSocket = (): void => {
  if (!socket) return;
  socket.disconnect();
  socket.connect();
};

export const getSocket = (): Socket | null => socket;
