import React from "react";
import { Box, styled } from "@mui/material";
import { TagProps } from "./Tag.types";

const StyledTag = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px 6px",
  borderRadius: 8,
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 500,
  backgroundColor: theme.palette.grayscale[50],
  color: theme.palette.grayscale[950],
}));

export const Tag: React.FC<TagProps> = ({ text, bgColor, textColor }) => (
  <StyledTag
    sx={{
      ...(bgColor && { backgroundColor: bgColor }),
      ...(textColor && { color: textColor }),
    }}
  >
    {text}
  </StyledTag>
);
