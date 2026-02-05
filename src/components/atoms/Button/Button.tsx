import React from "react";
import { Button as MuiButton, CircularProgress, styled } from "@mui/material";
import { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";
import { Icon, IconName } from "components";

const sizeConfig: Record<
  ButtonSize,
  {
    fontWeight: number;
    fontSize: number;
    lineHeight: string;
    height: number;
    iconSize: number;
    gap: number;
    paddingWithText: number;
    paddingIconOnly: number;
    borderRadius: number;
  }
> = {
  large: {
    fontWeight: 500,
    fontSize: 18,
    lineHeight: "24px",
    height: 54,
    iconSize: 22,
    gap: 6,
    paddingWithText: 20,
    paddingIconOnly: 16,
    borderRadius: 16,
  },
  normal: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: "22px",
    height: 48,
    iconSize: 20,
    gap: 6,
    paddingWithText: 16,
    paddingIconOnly: 14,
    borderRadius: 12,
  },
  small: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "20px",
    height: 40,
    iconSize: 18,
    gap: 4,
    paddingWithText: 16,
    paddingIconOnly: 12,
    borderRadius: 10,
  },
  xs: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: "16px",
    height: 24,
    iconSize: 16,
    gap: 4,
    paddingWithText: 8,
    paddingIconOnly: 4,
    borderRadius: 8,
  },
};

const variantStyles: Record<ButtonVariant, Record<string, unknown>> = {
  primary: {
    backgroundColor: "primary.main",
    color: "grayscale.0",
    border: "none",
    "&:hover": {
      backgroundColor: "primary.600",
    },
    "&:disabled": {
      backgroundColor: "primary.main",
      color: "grayscale.0",
      opacity: 0.4,
    },
  },
  secondary: {
    backgroundColor: "primary.50",
    color: "primary.600",
    border: "none",
    "&:hover": {
      backgroundColor: "primary.100",
    },
    "&:disabled": {
      backgroundColor: "primary.50",
      color: "primary.600",
      opacity: 0.4,
    },
  },
  gray: {
    backgroundColor: "grayscale.50",
    color: "grayscale.950",
    border: "none",
    "&:hover": {
      backgroundColor: "grayscale.100",
    },
    "&:disabled": {
      backgroundColor: "grayscale.50",
      color: "grayscale.950",
      opacity: 0.4,
    },
  },
  white: {
    backgroundColor: "grayscale.0",
    color: "grayscale.950",
    border: "none",
    "&:hover": {
      backgroundColor: "grayscale.0",
    },
    "&:disabled": {
      backgroundColor: "grayscale.0",
      color: "grayscale.950",
      opacity: 0.4,
    },
  },
  text: {
    backgroundColor: "transparent",
    color: "primary.main",
    border: "none",
    padding: 0,
    minWidth: "auto",
    height: "auto",
    "&:hover": {
      backgroundColor: "transparent",
      color: "primary.600",
    },
    "&:active": {
      backgroundColor: "transparent",
    },
    "&:disabled": {
      backgroundColor: "transparent",
      color: "primary.main",
      opacity: 0.4,
    },
  },
  negative: {
    backgroundColor: "additional.red.200",
    color: "additional.red.main",
    border: "none",
    "&:hover": {
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), #FDF4F4",
    },
    "&:disabled": {
      backgroundColor: "additional.red.200",
      color: "additional.red.main",
      opacity: 0.4,
    },
  },
  liquid: {
    background: "rgba(255, 255, 255, 0.12)",
    color: "grayscale.0",
    border: "1.4px solid rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    "&:hover": {
      background: "rgba(255, 255, 255, 0.2)",
    },
    "&:disabled": {
      background: "rgba(255, 255, 255, 0.12)",
      color: "grayscale.0",
      opacity: 0.4,
    },
  },
};

const StyledButton = styled(MuiButton)({
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "none",
  },
});

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "normal",
  leftIcon,
  rightIcon,
  text,
  loading = false,
  disabled,
  children,
  sx,
  ...props
}) => {
  const config = sizeConfig[size];
  const hasText = Boolean(text || children);
  const isIconOnly = !hasText && (leftIcon || rightIcon);

  const paddingInline = isIconOnly
    ? config.paddingIconOnly
    : config.paddingWithText;

  const renderIcon = (iconName: IconName | undefined, showLoader: boolean) => {
    if (showLoader) {
      return <CircularProgress size={config.iconSize} color="inherit" />;
    }
    if (iconName) {
      return <Icon name={iconName} size={config.iconSize} />;
    }
    return null;
  };

  const isTextVariant = variant === "text";

  return (
    <StyledButton
      disabled={disabled || loading}
      disableRipple={isTextVariant}
      sx={[
        {
          fontWeight: config.fontWeight,
          fontSize: config.fontSize,
          lineHeight: config.lineHeight,
          height: isTextVariant ? "auto" : config.height,
          borderRadius: isTextVariant ? 0 : `${config.borderRadius}px`,
          paddingInline: isTextVariant ? 0 : `${paddingInline}px`,
          gap: `${config.gap}px`,
          minWidth: isTextVariant
            ? "auto"
            : isIconOnly
              ? config.height
              : undefined,
        },
        variantStyles[variant],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {renderIcon(leftIcon, loading && !rightIcon)}
      {text || children}
      {renderIcon(rightIcon, loading && !!rightIcon)}
    </StyledButton>
  );
};
