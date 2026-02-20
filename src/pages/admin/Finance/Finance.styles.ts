import { SxProps, Theme } from "@mui/material";
import { LEDGER_TYPES, LedgerType } from "types";

export const financeStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  title: {
    color: "grayscale.900",
    fontWeight: 600,
  },
  summaryContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 2,
    mb: 3,
  },
  summaryCard: {
    p: 2.5,
    bgcolor: "grayscale.0",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grayscale.100",
  },
  summaryLabel: {
    color: "grayscale.500",
    fontSize: "0.75rem",
    mb: 0.5,
  },
  summaryValue: {
    color: "grayscale.900",
    fontWeight: 600,
    fontSize: "1.25rem",
  },
  filterBar: {
    display: "flex",
    gap: 2,
    mb: 3,
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterSelect: {
    minWidth: 140,
  },
  searchField: {
    minWidth: 200,
  },
  tableContainer: {
    bgcolor: "grayscale.0",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grayscale.100",
    overflowX: "auto",
    overflowY: "hidden",
  },
  tableHead: {
    bgcolor: "grayscale.50",
  },
  tableHeadCell: {
    color: "grayscale.600",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    whiteSpace: "nowrap",
  },
  sortableHeadCell: {
    color: "grayscale.600",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    whiteSpace: "nowrap",
    "& .MuiTableSortLabel-root": {
      color: "grayscale.600",
      "&:hover": { color: "grayscale.900" },
    },
    "& .MuiTableSortLabel-icon": { opacity: 0.4 },
    "& .MuiTableSortLabel-root.Mui-active": {
      color: "grayscale.900",
      "& .MuiTableSortLabel-icon": { opacity: 1, color: "primary.main" },
    },
  },
  tableCell: {
    color: "grayscale.900",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  truncatedCell: {
    color: "grayscale.700",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emptyState: {
    textAlign: "center",
    py: 6,
    color: "grayscale.500",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    py: 6,
  },
  paginationContainer: {
    borderTop: "1px solid",
    borderColor: "grayscale.100",
  },
};

export const LEDGER_TYPE_COLORS: Record<
  LedgerType,
  { bg: string; text: string }
> = {
  [LEDGER_TYPES.TASK_REWARD]: {
    bg: "additional.green.200",
    text: "additional.green.main",
  },
  [LEDGER_TYPES.BONUS]: {
    bg: "additional.orange.200",
    text: "additional.orange.main",
  },
  [LEDGER_TYPES.ADJUSTMENT]: { bg: "primary.50", text: "primary.600" },
  [LEDGER_TYPES.WITHDRAWAL]: {
    bg: "additional.red.200",
    text: "additional.red.main",
  },
};

export const getLedgerTypeChipSx = (type: LedgerType) => {
  const colors = LEDGER_TYPE_COLORS[type] ?? {
    bg: "grayscale.50",
    text: "grayscale.600",
  };
  return {
    bgcolor: colors.bg,
    color: colors.text,
    fontWeight: 600,
    border: "none",
  };
};

export const getPaidChipSx = (isPaid: boolean) => ({
  bgcolor: isPaid ? "additional.green.200" : "additional.orange.200",
  color: isPaid ? "additional.green.main" : "additional.orange.main",
  fontWeight: 600,
  border: "none",
});
