import { SxProps, Theme } from "@mui/material";
import { SprintStatus } from "types";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  DRAFT: { bg: "#F3F4F6", text: "#4B5563" },
  ACTIVE: { bg: "#DBEAFE", text: "#1D4ED8" },
  COMPLETED: { bg: "#D1FAE5", text: "#047857" },
  CANCELLED: { bg: "#FEE2E2", text: "#B91C1C" },
};

export const getStatusChipSx = (status: SprintStatus): SxProps<Theme> => {
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.DRAFT;
  return {
    bgcolor: colors.bg,
    color: colors.text,
    fontWeight: 600,
    fontSize: "0.75rem",
  };
};

export const sprintsStyles: Record<string, SxProps<Theme>> = {
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
  filterContainer: {
    display: "flex",
    gap: 1,
    mb: 3,
    flexWrap: "wrap",
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
  },
  tableCell: {
    color: "grayscale.900",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  clickableRow: {
    cursor: "pointer",
    "&:hover": {
      bgcolor: "grayscale.50",
    },
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
  dialogTitle: {
    fontWeight: 600,
  },
  dialogContent: {},
  dialogActions: {
    px: 3,
    pb: 2,
  },
  deleteDialogText: {
    color: "grayscale.600",
  },
};
