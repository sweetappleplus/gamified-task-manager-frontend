import React, { useMemo } from "react";
import { Box, styled } from "@mui/material";
import { RewardsEconomicsProps } from "./RewardsEconomics.types";

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

const Row = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const Card = styled(Box)(({ theme }) => ({
  flex: 1,
  height: 54,
  borderRadius: 16,
  border: "1px solid",
  borderColor: theme.palette.grayscale[50],
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const CardAmount = styled(Box)(({ theme }) => ({
  fontSize: 16,
  lineHeight: "22px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
}));

const CardLabel = styled(Box)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 400,
  color: theme.palette.grayscale[600],
}));

const CommissionBadge = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 500,
  color: theme.palette.grayscale[950],
  backgroundColor: theme.palette.grayscale[50],
  padding: "4px 8px",
  borderRadius: 8,
  whiteSpace: "nowrap",
  zIndex: 1,
  marginLeft: -8,
  marginRight: -8,
}));

const formatAmount = (value: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const RewardsEconomics: React.FC<RewardsEconomicsProps> = ({
  budget,
  commissionPercent,
  sx,
}) => {
  const reward = useMemo(
    () => budget * (1 - commissionPercent / 100),
    [budget, commissionPercent]
  );

  return (
    <Wrapper sx={sx}>
      <Title>Rewards & Economics</Title>
      <Row>
        <Card>
          <CardAmount>$ {formatAmount(budget)}</CardAmount>
          <CardLabel>Order Total</CardLabel>
        </Card>
        <CommissionBadge>Commission {commissionPercent}%</CommissionBadge>
        <Card>
          <CardAmount>$ {formatAmount(reward)}</CardAmount>
          <CardLabel>Your Reward</CardLabel>
        </Card>
      </Row>
    </Wrapper>
  );
};
