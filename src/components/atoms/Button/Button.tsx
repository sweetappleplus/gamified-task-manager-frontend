import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import { ButtonProps } from "./Button.types";

/**
 * Button component built on top of MUI Button
 *
 * @example
 * ```tsx
 * <Button variant="contained" color="primary">
 *   Click me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled,
  variant = "contained",
  size = "medium",
  color = "primary",
  fullWidth = false,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}
      endIcon={loading ? undefined : endIcon}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
