import React from "react";
import { Box, styled } from "@mui/material";
import { SkeletonProps } from "./Skeleton.types";

const Wrapper = styled(Box)(({ theme }) => ({
  width: 277,
  padding: "6px 28px",
  borderRadius: 12,
  backgroundColor: theme.palette.grayscale[50],
  display: "flex",
  alignItems: "center",
  gap: 16,
}));

const Circle = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: theme.palette.grayscale[100],
  flexShrink: 0,
}));

const Bars = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 9,
});

const Bar = styled(Box)(({ theme }) => ({
  height: 7,
  borderRadius: 999,
  backgroundColor: theme.palette.grayscale[100],
}));

export const Skeleton: React.FC<SkeletonProps> = ({ sx }) => (
  <Wrapper sx={sx}>
    <Circle />
    <Bars>
      <Bar sx={{ width: 122 }} />
      <Bar sx={{ width: 177 }} />
    </Bars>
  </Wrapper>
);
