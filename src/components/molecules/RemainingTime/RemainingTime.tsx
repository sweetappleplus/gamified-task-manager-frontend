import React, { useState, useEffect, useCallback } from "react";
import { Box, styled } from "@mui/material";
import { PatternPanel, TimeCounter, ProgressIndicator } from "components";
import { RemainingTimeProps } from "./RemainingTime.types";

const Header = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 16,
});

const Label = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "22px",
  fontWeight: 500,
  color: theme.palette.grayscale[0],
}));

const Footer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 6,
});

const FooterText = styled(Box)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 400,
  color: theme.palette.grayscale[0],
}));

const formatDeadline = (deadline: string): string => {
  const date = new Date(deadline);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return isToday
    ? `Today at ${time}`
    : `${date.toLocaleDateString()} at ${time}`;
};

const computeState = (startMs: number, deadlineMs: number) => {
  const nowMs = Date.now();
  const total = deadlineMs - startMs;
  const remaining = Math.max(0, Math.floor((deadlineMs - nowMs) / 1000));
  const percentage =
    total <= 0
      ? 100
      : Math.min(100, Math.max(0, ((nowMs - startMs) / total) * 100));
  return { remaining, percentage };
};

export const RemainingTime: React.FC<RemainingTimeProps> = ({
  startDateTime,
  deadlineDateTime,
  sx,
}) => {
  const startMs = new Date(startDateTime).getTime();
  const deadlineMs = new Date(deadlineDateTime).getTime();

  const calcState = useCallback(
    () => computeState(startMs, deadlineMs),
    [startMs, deadlineMs]
  );

  const [state, setState] = useState(calcState);

  useEffect(() => {
    setState(calcState());
    const interval = setInterval(() => {
      setState(calcState());
    }, 1000);
    return () => clearInterval(interval);
  }, [calcState]);

  return (
    <Box sx={sx}>
      <PatternPanel variant="dots" color="green" padding={12}>
        <Header>
          <Label>Remaining time</Label>
          <TimeCounter seconds={state.remaining} />
        </Header>
        <ProgressIndicator
          variant="bar"
          percentage={state.percentage}
          color="green"
        />
        <Footer>
          <FooterText>Deadline: {formatDeadline(deadlineDateTime)}</FooterText>
          <FooterText>{Math.round(state.percentage)}%</FooterText>
        </Footer>
      </PatternPanel>
    </Box>
  );
};
