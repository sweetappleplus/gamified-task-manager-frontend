import React from "react";
import { Box, Snackbar, styled, Theme, useTheme } from "@mui/material";
import { ToastProps, ToastVariant } from "./Toast.types";
import { Icon, IconName } from "components";

const iconMap: Record<ToastVariant, IconName> = {
  info: "information-circle",
  success: "tick-circle",
  warning: "information-circle",
  error: "x-circle",
};

const getVariantColors = (theme: Theme, variant: ToastVariant) => {
  const colorMap: Record<
    ToastVariant,
    { bg: string; border: string; icon: string; text: string }
  > = {
    info: {
      bg: theme.palette.primary[50],
      border: theme.palette.primary[200],
      icon: theme.palette.primary.main,
      text: theme.palette.primary[800],
    },
    success: {
      bg: theme.palette.additional.green[200],
      border: theme.palette.additional.green.main,
      icon: theme.palette.additional.green.main,
      text: theme.palette.grayscale[900],
    },
    warning: {
      bg: theme.palette.additional.orange[200],
      border: theme.palette.additional.orange.main,
      icon: theme.palette.additional.orange.main,
      text: theme.palette.grayscale[900],
    },
    error: {
      bg: theme.palette.additional.red[200],
      border: theme.palette.additional.red.main,
      icon: theme.palette.additional.red.main,
      text: theme.palette.grayscale[900],
    },
  };
  return colorMap[variant];
};

const ToastContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  minWidth: 280,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
});

const CloseButton = styled(Box)({
  display: "flex",
  marginLeft: "auto",
  cursor: "pointer",
  flexShrink: 0,
});

export const Toast: React.FC<ToastProps> = ({
  variant = "info",
  message,
  open,
  onClose,
  onClickCloseButton,
  autoHideDuration = 3000,
  ...props
}) => {
  const theme = useTheme();
  const colors = getVariantColors(theme, variant);

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      {...props}
    >
      <ToastContent
        sx={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
      >
        <Icon name={iconMap[variant]} size={20} color={colors.icon} />
        {message}
        <CloseButton onClick={onClickCloseButton || onClose}>
          <Icon name="x" size={18} color={theme.palette.grayscale[400]} />
        </CloseButton>
      </ToastContent>
    </Snackbar>
  );
};
