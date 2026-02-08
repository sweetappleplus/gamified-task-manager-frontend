import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon, Text } from "components";
import {
  FooterNavButtonProps,
  FooterNavButtonVariant,
} from "./FooterNavButton.types";

const gradientBorder = `linear-gradient(173.83deg, rgba(255, 255, 255, 0.4) 4.82%, rgba(255, 255, 255, 0.0001) 38.08%, rgba(255, 255, 255, 0.0001) 56.68%, rgba(255, 255, 255, 0.1) 95.1%)`;

const Container = styled(Box)<{
  ownerState: {
    variant: FooterNavButtonVariant;
    isActive: boolean;
  };
}>(({ theme, ownerState }) => {
  const isHighlighted = ownerState.variant === "highlighted";
  const isActive = ownerState.isActive;

  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    width: isHighlighted ? 54 : 46,
    height: isHighlighted ? 54 : 46,
    borderRadius: isHighlighted ? "50%" : 16,
    backgroundColor: isHighlighted
      ? theme.palette.primary.main
      : isActive
        ? `${theme.palette.grayscale[0]}CC`
        : "transparent",
    border: isActive && !isHighlighted ? "none" : "1.4px solid transparent",
    backgroundImage: isActive && !isHighlighted ? "none" : `${gradientBorder}`,
    backgroundOrigin: "border-box",
    backgroundClip:
      isActive && !isHighlighted ? "padding-box" : "padding-box, border-box",
    cursor: "pointer",
    flexShrink: 0,
    position: "relative",
    "&::before":
      isActive && !isHighlighted
        ? {}
        : {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
            padding: "1.4px",
            background: gradientBorder,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
  };
});

export const FooterNavButton: React.FC<FooterNavButtonProps> = ({
  icon,
  label,
  route,
  variant = "default",
  isActive = false,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = () => {
    navigate(route);
  };

  const isHighlighted = variant === "highlighted";
  const iconColor = isHighlighted
    ? theme.palette.grayscale[0]
    : isActive
      ? theme.palette.primary.main
      : theme.palette.grayscale[950];
  const textColor = isHighlighted
    ? theme.palette.grayscale[0]
    : isActive
      ? theme.palette.primary.main
      : theme.palette.grayscale[950];

  return (
    <Container
      onClick={handleClick}
      ownerState={{ variant, isActive }}
      role="button"
      tabIndex={0}
    >
      <Icon name={icon} size={20} color={iconColor} />
      <Text
        sx={{
          fontSize: 10,
          lineHeight: "12px",
          fontWeight: 400,
          color: textColor,
        }}
      >
        {label}
      </Text>
    </Container>
  );
};
