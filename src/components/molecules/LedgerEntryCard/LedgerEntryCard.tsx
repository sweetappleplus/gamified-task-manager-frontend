import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Icon, Tag } from "components";
import { PAYMENT_METHOD_TYPES } from "types";
import {
  LEDGER_ENTRY_STATUSES,
  LEDGER_ENTRY_VARIANTS,
  LedgerEntryCardProps,
} from "./LedgerEntryCard.types";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  [PAYMENT_METHOD_TYPES.BANK_ACCOUNT]: "Bank Account",
  [PAYMENT_METHOD_TYPES.PAYPAL]: "PayPal",
  [PAYMENT_METHOD_TYPES.CRYPTO]: "Crypto",
  [PAYMENT_METHOD_TYPES.CARD]: "Card",
};

export const LedgerEntryCard: React.FC<LedgerEntryCardProps> = (props) => {
  const { variant, status, amount, date, sx } = props;
  const theme = useTheme();

  const isGetPaid = variant === LEDGER_ENTRY_VARIANTS.GET_PAID;
  const isDone = status === LEDGER_ENTRY_STATUSES.DONE;

  const statusText = isGetPaid
    ? isDone
      ? "Paid"
      : "Pending"
    : isDone
      ? "Completed"
      : "Processing";

  const statusBgColor = isDone
    ? theme.palette.additional.green[200]
    : theme.palette.additional.orange[200];

  const statusTextColor = isDone
    ? theme.palette.additional.green.main
    : theme.palette.additional.orange.main;

  const title = isGetPaid
    ? props.taskTitle
    : PAYMENT_METHOD_LABELS[props.paymentMethod] || props.paymentMethod;

  return (
    <Box
      sx={{
        bgcolor: theme.palette.grayscale[0],
        borderRadius: "12px",
        p: "12px",
        width: "100%",
        ...sx,
      }}
    >
      {/* First block: Title + Date */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            lineHeight: "22px",
            fontWeight: 500,
            color: theme.palette.grayscale[950],
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mr: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            lineHeight: "16px",
            fontWeight: 400,
            color: theme.palette.grayscale[950],
            whiteSpace: "nowrap",
          }}
        >
          {date}
        </Typography>
      </Box>

      {/* Second block (4px gap): Tags + Reward */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "4px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {isGetPaid && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  height: 24,
                  px: "6px",
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.grayscale[50]}`,
                }}
              >
                <Icon
                  name={
                    props.category === "bonus"
                      ? "star-gold-colored"
                      : "star-silver-colored"
                  }
                  size={16}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: "16px",
                    fontWeight: 500,
                    color: theme.palette.grayscale[950],
                  }}
                >
                  {props.category === "bonus" ? "Bonus" : "Regular"}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  bgcolor: theme.palette.grayscale[100],
                }}
              />
            </>
          )}
          <Tag
            text={statusText}
            bgColor={statusBgColor}
            textColor={statusTextColor}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              color: theme.palette.grayscale[500],
            }}
          >
            Reward:
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              color: theme.palette.grayscale[950],
            }}
          >
            ${amount.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
