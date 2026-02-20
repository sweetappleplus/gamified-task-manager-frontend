import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Notification,
  AdminNotification,
  AdminNotificationFilterParams,
} from "types";

type NotificationState = {
  unreadCount: number;
  workerNotifications: Notification[];
  workerTotal: number;
  workerPage: number;
  workerIsLoading: boolean;
  workerHasMore: boolean;
  adminNotifications: AdminNotification[];
  adminTotal: number;
  adminIsLoading: boolean;
  adminFilters: AdminNotificationFilterParams;
};

const initialState: NotificationState = {
  unreadCount: 0,
  workerNotifications: [],
  workerTotal: 0,
  workerPage: 1,
  workerIsLoading: false,
  workerHasMore: true,
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
    setWorkerNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.workerNotifications = action.payload;
    },
    appendWorkerNotifications: (
      state,
      action: PayloadAction<Notification[]>
    ) => {
      state.workerNotifications = [
        ...state.workerNotifications,
        ...action.payload,
      ];
    },
    setWorkerTotal: (state, action: PayloadAction<number>) => {
      state.workerTotal = action.payload;
    },
    setWorkerPage: (state, action: PayloadAction<number>) => {
      state.workerPage = action.payload;
    },
    setWorkerLoading: (state, action: PayloadAction<boolean>) => {
      state.workerIsLoading = action.payload;
    },
    setWorkerHasMore: (state, action: PayloadAction<boolean>) => {
      state.workerHasMore = action.payload;
    },
    resetWorkerNotifications: (state) => {
      state.workerNotifications = [];
      state.workerTotal = 0;
      state.workerPage = 1;
      state.workerHasMore = true;
      state.workerIsLoading = false;
    },
    markWorkerNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.workerNotifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
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
  setWorkerNotifications,
  appendWorkerNotifications,
  setWorkerTotal,
  setWorkerPage,
  setWorkerLoading,
  setWorkerHasMore,
  resetWorkerNotifications,
  markWorkerNotificationAsRead,
  setAdminNotifications,
  setAdminTotal,
  setAdminLoading,
  setAdminFilters,
  removeNotificationFromList,
} = notificationSlice.actions;

export default notificationSlice.reducer;
