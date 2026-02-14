import React from "react";
import { ButtonBase, Typography, useTheme } from "@mui/material";
import { Icon } from "components";
import { AddButtonProps } from "./AddButton.types";

export const AddButton: React.FC<AddButtonProps> = ({
  text = "Add",
  onClick,
}) => {
  const theme = useTheme();

  return (
    <ButtonBase
      onClick={onClick}
      disableRipple
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        p: 0,
        bgcolor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <Icon name="plus-circle" size={18} color={theme.palette.primary.main} />
      <Typography
        sx={{
          fontSize: 14,
          lineHeight: "20px",
          fontWeight: 500,
          color: "primary.main",
        }}
      >
        {text}
      </Typography>
    </ButtonBase>
  );
};
