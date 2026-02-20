import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";
import {
  SidebarLinks,
  SidebarNavItemProps,
  UserInfo,
  PatternPanel,
  ProgressIndicator,
} from "components";
import { getWorkerSidebarNavItems, ROUTES } from "consts";
import { WorkerSidebarProps } from "./WorkerSidebar.types";
import { USER_ROLES } from "types";

const ProgressLabel = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  color: theme.palette.grayscale[0],
}));

const ProgressText = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[0],
}));

export const WorkerSidebar: React.FC<WorkerSidebarProps> = ({
  activeRoute,
  notificationCount,
  chatCount,
  user,
  leafVariant,
  leafText,
  onNotificationClick,
}) => {
  const navItems = useMemo<SidebarNavItemProps[]>(() => {
    const baseItems = getWorkerSidebarNavItems(notificationCount, chatCount);

    const itemsWithHandlers = baseItems.map((item) => {
      if (item.label === "Notifications" && onNotificationClick) {
        return {
          ...item,
          onClick: onNotificationClick,
        };
      }
      return item;
    });

    if (user?.role === USER_ROLES.SUPER_ADMIN) {
      return [
        ...itemsWithHandlers,
        {
          icon: "user-square" as const,
          label: "Admin",
          route: ROUTES.ADMIN_DASHBOARD.path,
        },
      ];
    }
    return itemsWithHandlers;
  }, [user?.role, notificationCount, chatCount, onNotificationClick]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 268,
      }}
    >
      <SidebarLinks items={navItems} activeRoute={activeRoute} />
      {user && leafVariant && (
        <UserInfo
          user={user}
          leafVariant={leafVariant}
          leafText={leafText}
          sx={{ mt: "20px", p: "4px" }}
        />
      )}
      {user?.level?.nextLevel && (
        <Box sx={{ mt: "8px" }}>
          <PatternPanel variant="dots" color="blue" padding={16}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ProgressLabel>Status Progress</ProgressLabel>
              <ProgressText>
                ${user.level.remainingEarningToNextLevel} to{" "}
                {user.level.nextLevel.name}
              </ProgressText>
            </Box>
            <Box sx={{ mt: "12px" }}>
              <ProgressIndicator
                variant="bar"
                percentage={user.level.progress}
                color="blue"
              />
            </Box>
          </PatternPanel>
        </Box>
      )}
    </Box>
  );
};
