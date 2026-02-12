import React from "react";
import { Box, styled } from "@mui/material";
import { DigitCardProps } from "./DigitCard.types";

const OVERLAY_BG = "rgba(255, 255, 255, 0.2)";

const Wrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: 16,
  height: 24,
  borderRadius: 4,
  overflow: "hidden",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[0],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: OVERLAY_BG,
  backdropFilter: "blur(12px)",
}));

const TopHalf = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "50%",
  backgroundColor: OVERLAY_BG,
});

export const DigitCard: React.FC<DigitCardProps> = ({ digit, sx }) => (
  <Wrapper sx={sx}>
    <TopHalf />
    {digit}
  </Wrapper>
);
