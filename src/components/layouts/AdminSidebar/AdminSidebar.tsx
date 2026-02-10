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
        bgcolor: "grayscale.950",
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
            color: "grayscale.0",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.05)",
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
                  color: isActive ? "primary.main" : "grayscale.0",
                  bgcolor: isActive ? "rgba(0, 145, 255, 0.1)" : "transparent",
                  justifyContent: isExpanded ? "flex-start" : "center",
                  "&:hover": {
                    bgcolor: isActive
                      ? "rgba(0, 145, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.05)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "rgba(0, 145, 255, 0.1)",
                    "&:hover": {
                      bgcolor: "rgba(0, 145, 255, 0.15)",
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
                {isExpanded && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: 14,
                          fontWeight: 500,
                          lineHeight: "20px",
                        },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
