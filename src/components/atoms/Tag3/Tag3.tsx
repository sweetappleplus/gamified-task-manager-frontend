import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { Tag3Props } from "./Tag3.types";
import { Icon } from "components";

const ICON_SIZE = 20;

const StyledTag = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "4px 8px",
  borderRadius: 8,
  border: "1px solid",
  borderColor: theme.palette.grayscale[50],
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
  whiteSpace: "nowrap",
}));

export const Tag3: React.FC<Tag3Props> = ({ text, icon, onClick }) => {
  const theme = useTheme();

  return (
    <StyledTag
      onClick={onClick}
      sx={onClick ? { cursor: "pointer" } : undefined}
    >
      {icon && (
        <Icon
          name={icon}
          size={ICON_SIZE}
          color={theme.palette.grayscale[200]}
        />
      )}
      {text}
    </StyledTag>
  );
};
