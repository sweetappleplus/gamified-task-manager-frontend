import axios from "axios";
import { io, Socket } from "socket.io-client";
import {
  API_URL,
  API_URL_AUTH_REFRESH,
  SOCKET_RECONNECTION_ATTEMPTS,
  SOCKET_RECONNECTION_DELAY_MS,
} from "consts";
import {
  getAccessToken,
  getRefreshToken,
  getTokenExpiryMs,
  setTokens,
} from "utils";
import { ApiResponse, AuthResponse } from "types";

const TOKEN_EXPIRY_BUFFER_MS = 30_000;

let socket: Socket | null = null;
let isRefreshingToken = false;
let refreshPromise: Promise<string | null> | null = null;

const getSocketUrl = (): string => {
  const apiUrl = API_URL ?? "";
  return apiUrl.replace(/\/api\/?$/, "");
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post<ApiResponse<AuthResponse>>(
      `${API_URL}${API_URL_AUTH_REFRESH}`,
      { refreshToken }
    );
    const data = response.data.data;
    if (data) {
      setTokens(data.accessToken, data.refreshToken);
      return data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
};

const getValidToken = async (): Promise<string> => {
  const token = getAccessToken();
  if (!token) return "";

  const expiryMs = getTokenExpiryMs(token);
  const isExpiredOrExpiring =
    !expiryMs || expiryMs <= Date.now() + TOKEN_EXPIRY_BUFFER_MS;

  if (!isExpiredOrExpiring) return token;

  if (isRefreshingToken && refreshPromise) {
    const refreshed = await refreshPromise;
    return refreshed ?? "";
  }

  isRefreshingToken = true;
  refreshPromise = refreshAccessToken();

  try {
    const newToken = await refreshPromise;
    return newToken ?? "";
  } finally {
    isRefreshingToken = false;
    refreshPromise = null;
  }
};

export const connectSocket = (): Socket => {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(getSocketUrl(), {
    auth: async (cb) => {
      const token = await getValidToken();
      cb({ token });
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
