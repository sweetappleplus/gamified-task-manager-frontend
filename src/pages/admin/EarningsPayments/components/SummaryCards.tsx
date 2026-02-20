import { Box, Typography, Skeleton } from "@mui/material";
import { AdminLedgerSummary } from "types";
import { earningsStyles } from "../EarningsPayments.styles";

type SummaryCardsProps = {
  summary: AdminLedgerSummary | null;
  isLoading: boolean;
};

const formatAmount = (value: string | undefined) => {
  if (!value) return "$0.00";
  return `$${Number(value).toFixed(2)}`;
};

const cards: { label: string; key: keyof AdminLedgerSummary; color: string }[] =
  [
    {
      label: "Total Earned (Rewards)",
      key: "totalEarned",
      color: "additional.green.main",
    },
    {
      label: "Total Bonuses",
      key: "totalBonuses",
      color: "additional.orange.main",
    },
    { label: "Pending Payout", key: "pendingPayout", color: "primary.main" },
    {
      label: "Already Paid",
      key: "alreadyPaid",
      color: "additional.green.main",
    },
    {
      label: "Total Adjustments",
      key: "totalAdjustments",
      color: "grayscale.600",
    },
    {
      label: "Total Withdrawals",
      key: "totalWithdrawals",
      color: "additional.red.main",
    },
  ];

const SummaryCards = ({ summary, isLoading }: SummaryCardsProps) => {
  return (
    <Box sx={earningsStyles.summaryContainer}>
      {cards.map((card) => (
        <Box key={card.key} sx={earningsStyles.summaryCard}>
          <Typography sx={earningsStyles.summaryLabel}>{card.label}</Typography>
          {isLoading ? (
            <Skeleton width={100} height={32} />
          ) : (
            <Typography
              sx={{ ...earningsStyles.summaryValue, color: card.color }}
            >
              {formatAmount(summary?.[card.key])}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default SummaryCards;
