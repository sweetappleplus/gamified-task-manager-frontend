import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Icon } from "components";
import { ADMIN_SIDEBAR_NAV_ITEMS } from "consts/routes";
import { AdminSidebarProps } from "./AdminSidebar.types";

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeRoute }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
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
                {!isExpanded && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: isActive ? "primary.main" : "grayscale.400",
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
