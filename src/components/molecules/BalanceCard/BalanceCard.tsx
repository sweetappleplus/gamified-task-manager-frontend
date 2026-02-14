import React from "react";
import { Box, styled } from "@mui/material";
import { Icon, PatternPanel } from "components";
import { BalanceCardProps } from "./BalanceCard.types";

const Content = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Left = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Label = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[0],
}));

const AmountRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const Amount = styled(Box)(({ theme }) => ({
  fontSize: 24,
  lineHeight: "32px",
  fontWeight: 600,
  color: theme.palette.grayscale[0],
}));

const AdditionalBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 32,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(100px)",
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[0],
}));

const WalletIcon = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: "rotate(-15deg)",
  color: theme.palette.grayscale[0],
}));

const formatAmount = (value: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const BalanceCard: React.FC<BalanceCardProps> = ({
  label = "Balance After Completion",
  amountPrefix = "$",
  amount,
  additionalAmount,
  sx,
}) => (
  <Box sx={sx}>
    <PatternPanel variant="star" color="blue" padding={20}>
      <Content>
        <Left>
          <Label>{label}</Label>
          <AmountRow>
            <Amount>
              {amountPrefix}
              {formatAmount(amount)}
            </Amount>
            {additionalAmount !== undefined && (
              <AdditionalBadge>
                <Icon name="plus" size={14} color="grayscale.0" />${" "}
                {formatAmount(additionalAmount)}
              </AdditionalBadge>
            )}
          </AmountRow>
        </Left>
        <WalletIcon>
          <Icon name="wallet-open" size={48} color="grayscale.0" />
        </WalletIcon>
      </Content>
    </PatternPanel>
  </Box>
);
