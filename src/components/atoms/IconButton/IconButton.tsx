import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { IconButtonProps, IconButtonVariant } from "./IconButton.types";
import { Icon } from "../Icon";

const ICON_SIZE = 18;

const StyledIconButton = styled(Box)<{
  ownerState: { variant: IconButtonVariant };
}>(({ theme, ownerState }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: 10,
  cursor: "pointer",
  border: "1px solid",
  borderColor: theme.palette.grayscale[50],
  backgroundColor:
    ownerState.variant === "gray"
      ? theme.palette.grayscale[50]
      : theme.palette.grayscale[0],
  transition: "opacity 0.2s ease",
  "&:hover": {
    opacity: 0.8,
  },
}));

export const IconButton: React.FC<IconButtonProps> = ({
  variant = "gray",
  icon,
  onClick,
  disabled = false,
}) => {
  const theme = useTheme();

  return (
    <StyledIconButton
      onClick={disabled ? undefined : onClick}
      ownerState={{ variant }}
      sx={{
        ...(disabled && {
          opacity: 0.4,
          cursor: "default",
          "&:hover": { opacity: 0.4 },
        }),
      }}
    >
      <Icon name={icon} size={ICON_SIZE} color={theme.palette.grayscale[950]} />
    </StyledIconButton>
  );
};
