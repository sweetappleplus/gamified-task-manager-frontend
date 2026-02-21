import React from "react";
import { Box, styled, alpha } from "@mui/material";
import { Button, Icon, PatternPanel } from "components";
import { WalletCardProps } from "./WalletCard.types";

const TopSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  paddingTop: 20,
  paddingLeft: 20,
  paddingRight: 20,
  marginBottom: 8,
});

const TopLeft = styled(Box)({
  flex: 1,
});

const LabelRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.grayscale[0],
}));

const WalletLabel = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: alpha(theme.palette.grayscale[0], 0.8),
  marginLeft: 4,
}));

const BalanceValue = styled(Box)(({ theme }) => ({
  fontSize: 24,
  lineHeight: "32px",
  fontWeight: 600,
  color: theme.palette.grayscale[0],
}));

const BottomSection = styled(Box)({
  display: "flex",
  padding: 4,
  gap: 4,
});

const StatBlock = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: 12,
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.grayscale[0], 0.2),
  backdropFilter: "blur(32px)",
}));

const StatIconRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.grayscale[0],
}));

const StatLabel = styled(Box)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 400,
  color: alpha(theme.palette.grayscale[0], 0.8),
}));

const StatValue = styled(Box)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: theme.palette.grayscale[0],
  marginTop: 2,
}));

const formatAmount = (value: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const WalletCard: React.FC<WalletCardProps> = ({
  balance,
  totalEarnings,
  pending,
  onWithdraw,
  sx,
}) => (
  <Box sx={sx}>
    <PatternPanel variant="magic" color="blue" padding={0}>
      <TopSection>
        <TopLeft>
          <LabelRow>
            <Icon name="wallet-open" size={16} color="currentColor" />
            <WalletLabel>Wallet Balance</WalletLabel>
          </LabelRow>
          <BalanceValue>${formatAmount(balance)}</BalanceValue>
        </TopLeft>
        <Button
          variant="liquid"
          size="small"
          text="Withdraw"
          onClick={onWithdraw}
        />
      </TopSection>
      <BottomSection>
        <StatBlock>
          <StatIconRow>
            <Box sx={{ mr: "4px", display: "flex" }}>
              <Icon name="tick-circle" size={24} color="currentColor" />
            </Box>
            <Box>
              <StatLabel>Withdrawable</StatLabel>
              <StatValue>${formatAmount(totalEarnings)}</StatValue>
            </Box>
          </StatIconRow>
        </StatBlock>
        <StatBlock>
          <StatIconRow>
            <Box sx={{ mr: "4px", display: "flex" }}>
              <Icon name="clock-circle" size={24} color="currentColor" />
            </Box>
            <Box>
              <StatLabel>Pending Payments</StatLabel>
              <StatValue>${formatAmount(pending)}</StatValue>
            </Box>
          </StatIconRow>
        </StatBlock>
      </BottomSection>
    </PatternPanel>
  </Box>
);
