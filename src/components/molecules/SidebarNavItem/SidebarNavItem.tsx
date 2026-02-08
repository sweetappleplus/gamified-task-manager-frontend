import React from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon, Badge, Text } from "components";
import { SidebarNavItemProps } from "./SidebarNavItem.types";

const Container = styled(Box)<{
  ownerState: {
    variant: SidebarNavItemProps["variant"];
    isActive: boolean;
  };
}>(({ theme, ownerState }) => {
  const isHighlighted = ownerState.variant === "highlighted";
  const isActive = ownerState.isActive;

  return {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: 12,
    borderRadius: 16,
    backgroundColor: isHighlighted
      ? theme.palette.primary.main
      : isActive
        ? "rgba(255, 255, 255, 0.8)"
        : theme.palette.grayscale[50],
    color: isHighlighted
      ? theme.palette.grayscale[0]
      : isActive
        ? theme.palette.primary.main
        : theme.palette.grayscale[950],
    cursor: "pointer",
  };
});

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  icon,
  label,
  route,
  variant = "default",
  badge,
  isActive = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <Container
      onClick={handleClick}
      ownerState={{ variant, isActive }}
      role="button"
      tabIndex={0}
    >
      <Icon name={icon} size={24} />
      <Text
        variant="bodyStrong"
        sx={{
          flex: 1,
          minWidth: 0,
          color: "inherit",
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 500,
        }}
      >
        {label}
      </Text>
      {badge !== undefined && badge > 0 && (
        <Badge variant="secondary" text={badge.toString()} />
      )}
    </Container>
  );
};
