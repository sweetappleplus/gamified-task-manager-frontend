import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SidebarLinks, SidebarNavItemProps, UserInfo } from "components";
import { getWorkerSidebarNavItems, ROUTES } from "consts";
import { WorkerSidebarProps } from "./WorkerSidebar.types";
import { USER_ROLES } from "types";

export const WorkerSidebar: React.FC<WorkerSidebarProps> = ({
  activeRoute,
  notificationCount,
  chatCount,
  user,
  leafVariant,
  leafText,
}) => {
  const navItems = useMemo<SidebarNavItemProps[]>(() => {
    const baseItems = getWorkerSidebarNavItems(notificationCount, chatCount);

    if (user?.role === USER_ROLES.SUPER_ADMIN) {
      return [
        ...baseItems,
        {
          icon: "user-square",
          label: "Admin",
          route: ROUTES.ADMIN_DASHBOARD.path,
        },
      ];
    }
    return baseItems;
  }, [user?.role, notificationCount, chatCount]);

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
    </Box>
  );
};
