import React from "react";
import { Box, styled, Typography } from "@mui/material";
import { alpha, useTheme, Theme } from "@mui/material/styles";
import {
  ProgressIndicatorProps,
  ProgressIndicatorColor,
} from "./ProgressIndicator.types";

const RING_SIZE = 50;
const RING_STROKE_WIDTH = 4;
const RING_RADIUS = (RING_SIZE - RING_STROKE_WIDTH) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const BAR_HEIGHT = 6;
const POINTER_INNER_SIZE = 10;
const POINTER_BORDER_WIDTH = 2;

const getRingColor = (percentage: number, theme: Theme): string => {
  if (percentage <= 25) return theme.palette.additional.red.main;
  if (percentage <= 50) return theme.palette.additional.orange.main;
  if (percentage <= 75) return theme.palette.additional.yellow.main;
  return theme.palette.additional.green.main;
};

const getBarInnerColor = (
  color: ProgressIndicatorColor,
  theme: Theme
): string =>
  color === "blue"
    ? theme.palette.additional.blue.main
    : theme.palette.additional.green.main;

const RingWrapper = styled(Box)({
  position: "relative",
  width: RING_SIZE,
  height: RING_SIZE,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const RingLabelContainer = styled(Box)({
  position: "absolute",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
});

const PercentageNumber = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "22px",
  color: theme.palette.grayscale[950],
  fontWeight: 400,
}));

const PercentageSymbol = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  color: theme.palette.grayscale[950],
  fontWeight: 400,
}));

const BarTrack = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: BAR_HEIGHT,
  borderRadius: 1000,
  backgroundColor: alpha(theme.palette.grayscale[0], 0.2),
}));

const BarFill = styled(Box)<{
  ownerState: { percentage: number };
}>(({ theme, ownerState }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: `${ownerState.percentage}%`,
  borderRadius: 1000,
  backgroundColor: theme.palette.grayscale[0],
}));

const BarPointer = styled(Box)<{
  ownerState: { percentage: number; innerColor: string };
}>(({ theme, ownerState }) => ({
  position: "absolute",
  top: "50%",
  left: `${ownerState.percentage}%`,
  transform: "translate(-50%, -50%)",
  width: POINTER_INNER_SIZE,
  height: POINTER_INNER_SIZE,
  borderRadius: "50%",
  backgroundColor: ownerState.innerColor,
  border: `${POINTER_BORDER_WIDTH}px solid ${theme.palette.grayscale[0]}`,
  boxSizing: "content-box",
}));

const RingProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
  const theme = useTheme();
  const clamped = Math.min(100, Math.max(0, Math.round(percentage)));
  const offset = RING_CIRCUMFERENCE * (1 - clamped / 100);
  const ringColor = getRingColor(clamped, theme);

  return (
    <RingWrapper>
      <svg
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke={theme.palette.grayscale[50]}
          strokeWidth={RING_STROKE_WIDTH}
        />
        {clamped > 0 && (
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke={ringColor}
            strokeWidth={RING_STROKE_WIDTH}
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        )}
      </svg>
      <RingLabelContainer>
        <PercentageNumber>{clamped}</PercentageNumber>
        <PercentageSymbol>%</PercentageSymbol>
      </RingLabelContainer>
    </RingWrapper>
  );
};

const BarProgress: React.FC<{
  percentage: number;
  color: ProgressIndicatorColor;
}> = ({ percentage, color }) => {
  const theme = useTheme();
  const clamped = Math.min(100, Math.max(0, percentage));
  const innerColor = getBarInnerColor(color, theme);

  return (
    <BarTrack>
      <BarFill ownerState={{ percentage: clamped }} />
      <BarPointer ownerState={{ percentage: clamped, innerColor }} />
    </BarTrack>
  );
};

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  variant,
  percentage,
  color = "blue",
}) => {
  if (variant === "ring") {
    return <RingProgress percentage={percentage} />;
  }

  return <BarProgress percentage={percentage} color={color} />;
};
