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
  whiteSpace: "nowrap",
  backgroundColor: theme.palette.grayscale[50],
  color: theme.palette.grayscale[950],
}));

export const Tag: React.FC<TagProps> = ({
  text,
  bgColor,
  textColor,
  maxWidth,
}) => (
  <StyledTag
    sx={{
      ...(bgColor && { backgroundColor: bgColor }),
      ...(textColor && { color: textColor }),
      ...(maxWidth && {
        display: "inline-block",
        maxWidth,
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "center",
      }),
    }}
  >
    {text}
  </StyledTag>
);
