import React from "react";
import { Box, Typography } from "@mui/material";
import { Button, Icon, BalanceCard } from "components";

interface SuccessStepProps {
  reward: number;
  onGoHome: () => void;
  onNextTask: () => void;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  reward,
  onGoHome,
  onNextTask,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Check icon with six-angle background */}
      <Box
        sx={{
          position: "relative",
          width: 174,
          height: 174,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/images/common/six-angle.png"
          alt=""
          sx={{ position: "absolute", width: 174, height: 174 }}
        />
        <Box sx={{ zIndex: 1, display: "flex" }}>
          <Icon name="tick-colored" size={100} color="additional.green.main" />
        </Box>
      </Box>

      {/* Text */}
      <Typography
        sx={{
          fontSize: 24,
          lineHeight: "32px",
          fontWeight: 600,
          color: "grayscale.950",
          mt: 0,
          textAlign: "center",
        }}
      >
        The task has been successfully submitted!
      </Typography>
      <Typography
        sx={{
          fontSize: 18,
          lineHeight: "24px",
          fontWeight: 400,
          color: "grayscale.500",
          mt: "8px",
          textAlign: "center",
        }}
      >
        Your application is under consideration
      </Typography>

      {/* Balance */}
      <BalanceCard
        label="Added to Your Balance"
        amountPrefix="+ $"
        amount={reward}
        sx={{ my: "32px", width: "100%" }}
      />

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
        }}
      >
        <Button
          variant="gray"
          text="Go Home"
          onClick={onGoHome}
          sx={{ width: "100%" }}
        />
        <Button
          variant="primary"
          text="Next task"
          onClick={onNextTask}
          sx={{ width: "100%" }}
        />
      </Box>
    </Box>
  );
};
