import React from "react";
import { Box } from "@mui/material";
import {
  LedgerEntryCard,
  LEDGER_ENTRY_VARIANTS,
  LEDGER_ENTRY_STATUSES,
  LEDGER_ENTRY_CATEGORIES,
  Spinner,
} from "components";
import type {
  LedgerEntryVariant,
  LedgerEntryStatus,
  LedgerEntryCategory,
} from "components";
import { LedgerEntry, LEDGER_TYPES, PAYMENT_METHOD_TYPES } from "types";
import { formatDate } from "utils";
import { financeStyles } from "../Finance.styles";

interface TransactionListProps {
  entries: LedgerEntry[];
  isLoading: boolean;
  hasMore: boolean;
  sentinelRef: (node: HTMLDivElement | null) => void;
}

const getEntryVariant = (entry: LedgerEntry): LedgerEntryVariant => {
  if (entry.type === LEDGER_TYPES.WITHDRAWAL) {
    return LEDGER_ENTRY_VARIANTS.WITHDRAWAL;
  }
  return LEDGER_ENTRY_VARIANTS.GET_PAID;
};

const getEntryStatus = (entry: LedgerEntry): LedgerEntryStatus => {
  return entry.isPaid
    ? LEDGER_ENTRY_STATUSES.DONE
    : LEDGER_ENTRY_STATUSES.PENDING;
};

const getEntryCategory = (entry: LedgerEntry): LedgerEntryCategory => {
  return entry.type === LEDGER_TYPES.BONUS
    ? LEDGER_ENTRY_CATEGORIES.BONUS
    : LEDGER_ENTRY_CATEGORIES.REGULAR;
};

export const TransactionList: React.FC<TransactionListProps> = ({
  entries,
  isLoading,
  hasMore,
  sentinelRef,
}) => {
  return (
    <Box sx={financeStyles.entryList}>
      {entries.map((entry) => {
        const variant = getEntryVariant(entry);
        const status = getEntryStatus(entry);
        const amount = Math.abs(parseFloat(entry.amount));
        const date = formatDate(entry.createdAt);

        if (variant === LEDGER_ENTRY_VARIANTS.WITHDRAWAL) {
          return (
            <LedgerEntryCard
              key={entry.id}
              variant="withdrawal"
              status={status}
              amount={amount}
              date={date}
              paymentMethod={
                entry.paymentMethod?.type ?? PAYMENT_METHOD_TYPES.BANK_ACCOUNT
              }
            />
          );
        }

        return (
          <LedgerEntryCard
            key={entry.id}
            variant="get_paid"
            status={status}
            category={getEntryCategory(entry)}
            taskTitle={entry.relatedTask?.title ?? entry.description ?? "Task"}
            amount={amount}
            date={date}
          />
        );
      })}

      {hasMore && (
        <Box ref={sentinelRef} sx={financeStyles.sentinel}>
          {isLoading && <Spinner size="sm" message="" />}
        </Box>
      )}
    </Box>
  );
};
