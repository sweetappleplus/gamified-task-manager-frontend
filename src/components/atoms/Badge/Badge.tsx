import React from "react";
import { styled } from "@mui/material";
import { BadgeProps, BadgeVariant } from "./Badge.types";

const StyledBadge = styled("span")<{
  ownerState: { variant: BadgeVariant };
}>(({ theme, ownerState }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 20,
  minWidth: 20,
  borderRadius: 1000,
  paddingInline: 6,
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[0],
  backgroundColor:
    ownerState.variant === "primary"
      ? theme.palette.primary.main
      : theme.palette.additional.red.main,
}));

export const Badge: React.FC<BadgeProps> = ({ variant = "primary", text }) => (
  <StyledBadge ownerState={{ variant }}>{text}</StyledBadge>
);
