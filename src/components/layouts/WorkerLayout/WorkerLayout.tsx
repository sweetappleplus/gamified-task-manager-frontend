import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { WorkerSidebar, WorkerFooter } from "components";
import { WorkerLayoutProps } from "./WorkerLayout.types";

export const WorkerLayout: React.FC<WorkerLayoutProps> = ({
  children,
  activeRoute,
  isAdmin = false,
  notificationCount,
  chatCount,
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
            isAdmin={isAdmin}
            notificationCount={notificationCount}
            chatCount={chatCount}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            ml: "20px",
            overflow: "auto",
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
