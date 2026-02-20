import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import {
  WorkerSidebar,
  WorkerFooter,
  NotificationList,
  Text,
} from "components";
import {
  useNotifications,
  useWorkerNotifications,
} from "features/notification";
import { useLevelConfig } from "features/level-config";
import { getLeafVariant } from "utils";
import { WorkerLayoutProps } from "./WorkerLayout.types";
import { useAuth } from "features/auth";
import { useModal } from "hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "consts";

const NotificationModalBody: React.FC = () => {
  const {
    notifications,
    isLoading,
    hasMore,
    fetchInitial,
    fetchMore,
    markAsRead,
  } = useWorkerNotifications();
  const { updateUnreadCount, unreadCount } = useNotifications();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  const handleSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            fetchMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasMore, isLoading, fetchMore]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleNotificationClick = (
    notificationId: string,
    isRead: boolean,
    relatedTaskId: string | null
  ) => {
    if (!isRead) {
      markAsRead(notificationId);
      if (unreadCount > 0) {
        updateUnreadCount(unreadCount - 1);
      }
    }
    if (relatedTaskId) {
      closeModal();
      navigate(ROUTES.TASK_DETAIL.path.replace(":id", relatedTaskId));
    }
  };

  const items = notifications.map((notification) => ({
    title: notification.title,
    content: notification.message,
    isRead: notification.isRead,
    onClick: () =>
      handleNotificationClick(
        notification.id,
        notification.isRead,
        notification.relatedTaskId
      ),
  }));

  return (
    <Box>
      {items.length === 0 && !isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 6,
          }}
        >
          <Text variant="body" sx={{ color: "grayscale.400" }}>
            No notifications yet
          </Text>
        </Box>
      )}
      {items.length > 0 && <NotificationList items={items} />}
      {hasMore && <Box ref={handleSentinelRef} sx={{ minHeight: 1 }} />}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export const WorkerLayout: React.FC<WorkerLayoutProps> = ({
  children,
  activeRoute,
  chatCount,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { user } = useAuth();
  const { unreadCount: notificationCount } = useNotifications();
  const { levelConfigs, fetchLevelConfigs } = useLevelConfig();
  const { openModal } = useModal();

  useEffect(() => {
    fetchLevelConfigs();
  }, [fetchLevelConfigs]);

  const handleOpenNotificationModal = useCallback(() => {
    openModal({
      title: "Notifications",
      body: <NotificationModalBody />,
      maxWidth: 400,
      maxHeight: 768,
      bgcolor: "grayscale.50",
      desktopBodyPadding: "4px",
      mobileBodyPadding: "4px",
    });
  }, [openModal]);

  const leafVariant = useMemo(
    () =>
      user?.level && levelConfigs.length > 0
        ? getLeafVariant(user.level.totalXp, levelConfigs)
        : undefined,
    [user?.level, levelConfigs]
  );
  const leafText = user?.level?.currentLevel.name;

  if (isDesktop) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
          pt: "24px",
          px: "24px",
          pb: 0,
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 24,
            alignSelf: "flex-start",
          }}
        >
          <WorkerSidebar
            activeRoute={activeRoute}
            notificationCount={notificationCount}
            chatCount={chatCount}
            user={user ?? undefined}
            leafVariant={leafVariant}
            leafText={leafText}
            onNotificationClick={handleOpenNotificationModal}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            ml: "20px",
            overflow: "auto",
            mb: "20px",
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: "16px",
        py: 0,
        pb: "120px",
      }}
    >
      {children}
      <Box
        sx={{
          position: "fixed",
          bottom: 42,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: theme.zIndex.appBar,
        }}
      >
        <WorkerFooter activeRoute={activeRoute} />
      </Box>
    </Box>
  );
};
