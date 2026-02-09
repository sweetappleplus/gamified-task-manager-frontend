import React from "react";
import { Box } from "@mui/material";
import { AdminSidebar } from "components";
import { AdminLayoutProps } from "./AdminLayout.types";

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeRoute,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        bgcolor: "grayscale.950",
      }}
    >
      <AdminSidebar activeRoute={activeRoute} />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          bgcolor: "grayscale.900",
        }}
      >
        <Box sx={{ padding: 4, color: "grayscale.0" }}>{children}</Box>
      </Box>
    </Box>
  );
};
