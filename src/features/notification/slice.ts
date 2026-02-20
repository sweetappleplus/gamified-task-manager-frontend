import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminNotification, AdminNotificationFilterParams } from "types";

type NotificationState = {
  unreadCount: number;
  adminNotifications: AdminNotification[];
  adminTotal: number;
  adminIsLoading: boolean;
  adminFilters: AdminNotificationFilterParams;
};

const initialState: NotificationState = {
  unreadCount: 0,
  adminNotifications: [],
  adminTotal: 0,
  adminIsLoading: false,
  adminFilters: {
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    setAdminNotifications: (
      state,
      action: PayloadAction<AdminNotification[]>
    ) => {
      state.adminNotifications = action.payload;
    },
    setAdminTotal: (state, action: PayloadAction<number>) => {
      state.adminTotal = action.payload;
    },
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.adminIsLoading = action.payload;
    },
    setAdminFilters: (
      state,
      action: PayloadAction<AdminNotificationFilterParams>
    ) => {
      state.adminFilters = action.payload;
    },
    removeNotificationFromList: (state, action: PayloadAction<string>) => {
      state.adminNotifications = state.adminNotifications.filter(
        (n) => n.id !== action.payload
      );
      state.adminTotal = Math.max(0, state.adminTotal - 1);
    },
  },
});

export const {
  setUnreadCount,
  setAdminNotifications,
  setAdminTotal,
  setAdminLoading,
  setAdminFilters,
  removeNotificationFromList,
} = notificationSlice.actions;

export default notificationSlice.reducer;
