import React from "react";
import { Box, Dialog, IconButton, Typography, useTheme } from "@mui/material";
import { Icon } from "components";
import { ModalProps } from "./Modal.types";

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  body,
  footer,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: "transparent",
            "@media (min-width: 768px)": {
              bgcolor: "#00000080",
            },
          },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "grayscale.0",
          display: "flex",
          flexDirection: "column",
          m: 0,
          width: "100%",
          height: "100dvh",
          maxWidth: "none",
          maxHeight: "none",
          borderRadius: 0,
          "@media (min-width: 768px)": {
            m: "auto",
            maxWidth: 480,
            height: "auto",
            maxHeight: 812,
            borderRadius: "16px",
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "grayscale.0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 56,
          flexShrink: 0,
          borderBottom: "none",
          "@media (min-width: 768px)": {
            height: 46,
          },
        }}
      >
        {/* Mobile close - left side */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            left: 12,
            p: 0,
            "@media (min-width: 768px)": {
              display: "none",
            },
          }}
        >
          <Icon name="x" size={24} color={theme.palette.grayscale[950]} />
        </IconButton>

        <Typography
          sx={{
            fontSize: 18,
            lineHeight: "24px",
            fontWeight: 600,
            color: "grayscale.950",
          }}
        >
          {title}
        </Typography>

        {/* Desktop close - right side */}
        <IconButton
          onClick={onClose}
          sx={{
            display: "none",
            "@media (min-width: 768px)": {
              display: "flex",
              position: "absolute",
              right: 16,
              p: 0,
            },
          }}
        >
          <Icon name="x" size={22} color={theme.palette.grayscale[950]} />
        </IconButton>
      </Box>

      {/* Body */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: "8px 16px",
          "@media (min-width: 768px)": {
            p: "16px",
          },
        }}
      >
        {body}
      </Box>

      {/* Footer */}
      {footer && (
        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 1,
            bgcolor: "grayscale.0",
            p: "16px",
            flexShrink: 0,
          }}
        >
          {footer}
        </Box>
      )}
    </Dialog>
  );
};
