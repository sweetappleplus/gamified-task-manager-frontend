import React from "react";
import { Box } from "@mui/material";
import { SidebarLinksProps } from "./SidebarLinks.types";
import { SidebarNavItem } from "components";

export const SidebarLinks: React.FC<SidebarLinksProps> = ({
  items,
  activeRoute,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "7px",
        padding: "8px",
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        borderRadius: "20px",
      }}
    >
      {items.map((item, index) => (
        <SidebarNavItem
          key={index}
          {...item}
          isActive={activeRoute === item.route}
        />
      ))}
    </Box>
  );
};
