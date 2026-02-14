import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setUser, logout as logoutAction, setInitialized } from "./slice";
import { RootState } from "app/store";
import { User, AuthResponse } from "types";
import {
  sendOtpApi,
  verifyOtpApi,
  logoutApi,
  refreshTokenApi,
  getMeApi,
} from "services";
import {
  setTokens,
  clearTokens,
  getRefreshToken,
  getAccessToken,
  getTokenExpiryMs,
  decodeToken,
} from "utils";
import { REFRESH_MARGIN_MS } from "consts";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isInitialized = useAppSelector(
    (state: RootState) => state.auth.isInitialized
  );
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getMeApi();
      if (response.data) {
        dispatch(setUser(response.data));
      }
    } catch {
      // Profile fetch failed silently; basic user data from token is still available
    }
  }, [dispatch]);

  const scheduleTokenRefresh = useCallback(
    (accessToken: string) => {
      clearRefreshTimer();
      const expiryMs = getTokenExpiryMs(accessToken);
      if (!expiryMs) return;

      const timeUntilRefresh = expiryMs - Date.now() - REFRESH_MARGIN_MS;
      if (timeUntilRefresh <= 0) return;

      refreshTimerRef.current = setTimeout(async () => {
        const currentRefreshToken = getRefreshToken();
        if (!currentRefreshToken) return;
        try {
          const response = await refreshTokenApi({
            refreshToken: currentRefreshToken,
          });
          if (response.data) {
            setTokens(response.data.accessToken, response.data.refreshToken);
            dispatch(setUser(response.data.user));
            scheduleTokenRefresh(response.data.accessToken);
            fetchProfile();
          }
        } catch {
          // Refresh failed silently; interceptor will handle on next request
        }
      }, timeUntilRefresh);
    },
    [clearRefreshTimer, dispatch, fetchProfile]
  );

  const handleAuthSuccess = useCallback(
    (data: AuthResponse) => {
      setTokens(data.accessToken, data.refreshToken);
      dispatch(setUser(data.user));
      scheduleTokenRefresh(data.accessToken);
      fetchProfile();
    },
    [dispatch, scheduleTokenRefresh, fetchProfile]
  );

  const sendOtp = useCallback(async (email: string) => {
    const response = await sendOtpApi({ email });
    return response;
  }, []);

  const verifyOtp = useCallback(
    async (email: string, otp: string) => {
      const response = await verifyOtpApi({ email, otp });
      if (response.data) {
        handleAuthSuccess(response.data);
      }
      return response;
    },
    [handleAuthSuccess]
  );

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        await logoutApi({ refreshToken });
      } catch {
        // Logout API failed, still clear local state
      }
    }
    clearRefreshTimer();
    clearTokens();
    dispatch(logoutAction());
  }, [dispatch, clearRefreshTimer]);

  const initializeAuth = useCallback(() => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (!accessToken || !refreshToken) {
      clearTokens();
      dispatch(setInitialized());
      return;
    }

    const payload = decodeToken(accessToken);
    if (!payload) {
      clearTokens();
      dispatch(setInitialized());
      return;
    }

    const userData: User = {
      id: payload.id,
      email: payload.email,
      name: null,
      role: payload.role,
    };
    dispatch(setUser(userData));
    scheduleTokenRefresh(accessToken);
    dispatch(setInitialized());
    fetchProfile();
  }, [dispatch, scheduleTokenRefresh, fetchProfile]);

  useEffect(() => {
    return () => {
      clearRefreshTimer();
    };
  }, [clearRefreshTimer]);

  return {
    user,
    isAuthenticated,
    isInitialized,
    sendOtp,
    verifyOtp,
    logout,
    initializeAuth,
  };
};
