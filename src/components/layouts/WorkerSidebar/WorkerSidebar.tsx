import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { SidebarLinks, SidebarNavItemProps } from "components";
import { getWorkerSidebarNavItems } from "consts/routes";
import { WorkerSidebarProps } from "./WorkerSidebar.types";

export const WorkerSidebar: React.FC<WorkerSidebarProps> = ({
  activeRoute,
  isAdmin = false,
  notificationCount,
  chatCount,
}) => {
  const navItems = useMemo<SidebarNavItemProps[]>(() => {
    const baseItems = getWorkerSidebarNavItems(notificationCount, chatCount);

    if (isAdmin) {
      return [
        ...baseItems,
        {
          icon: "user-square",
          label: "Admin",
          route: "/admin",
        },
      ];
    }
    return baseItems;
  }, [isAdmin, notificationCount, chatCount]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <SidebarLinks items={navItems} activeRoute={activeRoute} />
    </Box>
  );
};
