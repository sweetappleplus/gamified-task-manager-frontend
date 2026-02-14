import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Icon } from "components";
import { ADMIN_SIDEBAR_NAV_ITEMS, ADMIN_SIDEBAR_EXPANDED_KEY } from "consts";
import { AdminSidebarProps } from "./AdminSidebar.types";

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeRoute }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(() => {
    const stored = localStorage.getItem(ADMIN_SIDEBAR_EXPANDED_KEY);
    return stored !== null ? stored === "true" : true;
  });

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleToggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    localStorage.setItem(ADMIN_SIDEBAR_EXPANDED_KEY, String(next));
  };

  return (
    <Box
      sx={{
        width: isExpanded ? 268 : 60,
        height: "100dvh",
        bgcolor: "grayscale.0",
        borderRight: "1px solid",
        borderColor: "grayscale.100",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isExpanded ? "flex-end" : "center",
          padding: 1,
        }}
      >
        <IconButton
          onClick={handleToggle}
          sx={{
            color: "grayscale.600",
            "&:hover": {
              bgcolor: "grayscale.50",
            },
          }}
        >
          <Icon
            name={isExpanded ? "chevron-left" : "chevron-right"}
            size={20}
          />
        </IconButton>
      </Box>
      <List sx={{ padding: 0 }}>
        {ADMIN_SIDEBAR_NAV_ITEMS.map((item, index) => {
          const isActive = activeRoute === item.route;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.route)}
                selected={isActive}
                sx={{
                  color: isActive ? "primary.main" : "grayscale.700",
                  bgcolor: isActive ? "primary.50" : "transparent",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  "&:hover": {
                    bgcolor: isActive ? "primary.100" : "grayscale.50",
                  },
                  "&.Mui-selected": {
                    bgcolor: "primary.50",
                    "&:hover": {
                      bgcolor: "primary.100",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: isExpanded ? 36 : "unset",
                    justifyContent: "center",
                  }}
                >
                  <Icon name={item.icon} size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    transition: "opacity 0.2s ease",
                    transitionDelay: isExpanded ? "0.1s" : "0s",
                    whiteSpace: "nowrap",
                  }}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        lineHeight: "20px",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
