import React from "react";
import { Box, styled } from "@mui/material";
import { TabProps } from "./Tab.types";

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.palette.grayscale[50],
  borderRadius: 16,
  padding: 4,
  height: 44,
  gap: 4,
  width: "100%",
}));

const Item = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  borderRadius: 12,
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: isActive ? theme.palette.grayscale[0] : "transparent",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  color: isActive ? theme.palette.grayscale[950] : theme.palette.grayscale[700],
}));

export const Tab: React.FC<TabProps> = ({ items, value, onChange, sx }) => (
  <Container sx={sx}>
    {items.map((item) => (
      <Item
        key={item.value}
        isActive={item.value === value}
        onClick={() => onChange(item.value)}
      >
        {item.label}
      </Item>
    ))}
  </Container>
);
