import React from "react";
import { Box, Typography, styled } from "@mui/material";
import { BalanceCard, ProgressIndicator, PatternPanel } from "components";
import { UserLevel } from "types";

const sectionLabelSx = {
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: "grayscale.950",
  mb: "8px",
};

const AwardRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const AwardDivider = styled(Box)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.grayscale[50],
  marginTop: 8,
  marginBottom: 8,
}));

const AwardLabel = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[500],
}));

const AwardValue = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
}));

interface AwardStepProps {
  reward: number;
  commissionPercent: number;
  balanceAfterCompletion: number;
  additionalAmount: number;
  userLevel?: UserLevel;
}

const formatCurrency = (value: number): string =>
  `$${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const AwardStep: React.FC<AwardStepProps> = ({
  reward,
  commissionPercent,
  balanceAfterCompletion,
  additionalAmount,
  userLevel,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Award Section + Balance */}
      <Box>
        <Typography sx={sectionLabelSx}>Award</Typography>
        <Box
          sx={{
            border: 1,
            borderColor: "grayscale.50",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: "16px" }}>
            <AwardRow>
              <AwardLabel>Basic Reward</AwardLabel>
              <AwardValue>{formatCurrency(reward)}</AwardValue>
            </AwardRow>
            <AwardDivider />
            <AwardRow>
              <AwardLabel>Commission</AwardLabel>
              <AwardValue>{commissionPercent}%</AwardValue>
            </AwardRow>
          </Box>

          {/* Balance After Update */}
          <BalanceCard
            label="Balance After the Update"
            amount={balanceAfterCompletion}
            additionalAmount={additionalAmount}
          />
        </Box>
      </Box>

      {/* Your Progress */}
      {userLevel && userLevel.nextLevel && (
        <Box>
          <Typography sx={sectionLabelSx}>Your Progress</Typography>
          <PatternPanel variant="dots" color="blue" padding={16}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: "12px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "grayscale.0",
                }}
              >
                Status Progress
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  lineHeight: "20px",
                  fontWeight: 400,
                  color: "grayscale.0",
                }}
              >
                ${userLevel.remainingEarningToNextLevel.toLocaleString("en-US")}{" "}
                to {userLevel.nextLevel.name}
              </Typography>
            </Box>
            <ProgressIndicator
              variant="bar"
              percentage={userLevel.progress}
              color="blue"
            />
          </PatternPanel>
        </Box>
      )}
    </Box>
  );
};
