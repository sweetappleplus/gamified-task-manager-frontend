import React from "react";
import { Typography, styled } from "@mui/material";
import { TextProps, TextVariant } from "./Text.types";

const variantConfig: Record<
  TextVariant,
  { fontSize: number; lineHeight: string; fontWeight: number; color: string }
> = {
  heading: {
    fontSize: 20,
    lineHeight: "28px",
    fontWeight: 600,
    color: "grayscale.950",
  },
  body: {
    fontSize: 16,
    lineHeight: "22px",
    fontWeight: 400,
    color: "grayscale.950",
  },
  bodyMuted: {
    fontSize: 16,
    lineHeight: "22px",
    fontWeight: 400,
    color: "grayscale.500",
  },
};

const StyledText = styled(Typography)({});

export const Text: React.FC<TextProps> = ({
  variant = "body",
  children,
  sx,
  ...props
}) => {
  const config = variantConfig[variant];

  return (
    <StyledText
      sx={{
        fontSize: config.fontSize,
        lineHeight: config.lineHeight,
        fontWeight: config.fontWeight,
        color: config.color,
        ...sx,
      }}
      {...props}
    >
      {children}
    </StyledText>
  );
};
