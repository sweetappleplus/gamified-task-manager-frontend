import React, { useEffect, useMemo } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { WorkerSidebar, WorkerFooter } from "components";
import { useAppSelector } from "app/hooks";
import { useNotifications } from "features/notification";
import { useLevelConfig } from "features/level-config";
import { getLeafVariant } from "utils";
import { WorkerLayoutProps } from "./WorkerLayout.types";

export const WorkerLayout: React.FC<WorkerLayoutProps> = ({
  children,
  activeRoute,
  chatCount,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const user = useAppSelector((state) => state.auth.user);
  const { unreadCount: notificationCount } = useNotifications();
  const { levelConfigs, fetchLevelConfigs } = useLevelConfig();

  useEffect(() => {
    fetchLevelConfigs();
  }, [fetchLevelConfigs]);

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
