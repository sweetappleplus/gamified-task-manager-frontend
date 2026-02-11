import React from "react";
import { Box, CircularProgress, styled } from "@mui/material";
import { Text } from "../Text";
import { SpinnerProps, SpinnerSize } from "./Spinner.types";

const sizeConfig: Record<SpinnerSize, { spinner: number; thickness: number }> =
  {
    sm: { spinner: 24, thickness: 3 },
    md: { spinner: 36, thickness: 3.5 },
    lg: { spinner: 48, thickness: 4 },
  };

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 12,
});

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  message = "Loading",
}) => {
  const config = sizeConfig[size];

  return (
    <Wrapper>
      <CircularProgress
        size={config.spinner}
        thickness={config.thickness}
        sx={{ color: "primary.main" }}
      />
      {message && <Text variant="bodyMuted">{message}</Text>}
    </Wrapper>
  );
};
