import React from "react";
import { Box, styled, useTheme } from "@mui/material";
import { Icon, IconName } from "components";
import { StepsDescriptionProps } from "./StepsDescription.types";

const MAX_STEPS = 4;

const STEP_ICONS: IconName[] = ["number-1", "number-2", "number-3", "number-4"];

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Title = styled(Box)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
  marginBottom: 12,
}));

const StepRow = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  minHeight: 32,
  gap: 4,
});

const StepText = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
  paddingTop: 2,
}));

const Divider = styled(Box)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.grayscale[50],
  marginLeft: 28,
  marginTop: 4,
  marginBottom: 4,
}));

export const StepsDescription: React.FC<StepsDescriptionProps> = ({
  steps,
  sx,
}) => {
  const theme = useTheme();
  const visibleSteps = steps.slice(0, MAX_STEPS);

  return (
    <Wrapper sx={sx}>
      <Title>Steps to Complete</Title>
      {visibleSteps.map((step, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Divider />}
          <StepRow>
            <Icon
              name={STEP_ICONS[index]}
              size={24}
              color={theme.palette.primary.main}
            />
            <StepText>{step}</StepText>
          </StepRow>
        </React.Fragment>
      ))}
    </Wrapper>
  );
};
