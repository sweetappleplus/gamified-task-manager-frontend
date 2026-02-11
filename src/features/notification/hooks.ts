import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import { setUnreadCount } from "./slice";

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const unreadCount = useAppSelector(
    (state: RootState) => state.notification.unreadCount
  );

  const updateUnreadCount = useCallback(
    (count: number) => {
      dispatch(setUnreadCount(count));
    },
    [dispatch]
  );

  return {
    unreadCount,
    updateUnreadCount,
  };
};
