import { SxProps, Theme } from "@mui/material";
import { SprintStatus } from "types";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  DRAFT: { bg: "#F3F4F6", text: "#4B5563" },
  ACTIVE: { bg: "#DBEAFE", text: "#1D4ED8" },
  COMPLETED: { bg: "#D1FAE5", text: "#047857" },
  CANCELLED: { bg: "#FEE2E2", text: "#B91C1C" },
};

const TASK_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  NEW: { bg: "#F3F4F6", text: "#4B5563" },
  PENDING: { bg: "#FEF3C7", text: "#92400E" },
  IN_ACTION: { bg: "#DBEAFE", text: "#1D4ED8" },
  IN_REVIEW: { bg: "#E0E7FF", text: "#3730A3" },
  COMPLETED: { bg: "#D1FAE5", text: "#047857" },
  LATE: { bg: "#FEE2E2", text: "#B91C1C" },
  PAID: { bg: "#D1FAE5", text: "#047857" },
  FAILED: { bg: "#FEE2E2", text: "#B91C1C" },
  CANCELLED: { bg: "#F3F4F6", text: "#4B5563" },
};

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  LOW: { bg: "#D1FAE5", text: "#047857" },
  MEDIUM: { bg: "#FEF3C7", text: "#92400E" },
  HIGH: { bg: "#FEE2E2", text: "#B91C1C" },
};

export const getSprintStatusChipSx = (status: SprintStatus): SxProps<Theme> => {
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.DRAFT;
  return {
    bgcolor: colors.bg,
    color: colors.text,
    fontWeight: 600,
    fontSize: "0.75rem",
  };
};

export const getTaskStatusChipSx = (status: string): SxProps<Theme> => {
  const colors = TASK_STATUS_COLORS[status] ?? TASK_STATUS_COLORS.NEW;
  return {
    bgcolor: colors.bg,
    color: colors.text,
    fontWeight: 600,
    fontSize: "0.75rem",
  };
};

export const getPriorityChipSx = (priority: string): SxProps<Theme> => {
  const colors = PRIORITY_COLORS[priority] ?? PRIORITY_COLORS.LOW;
  return {
    bgcolor: colors.bg,
    color: colors.text,
    fontWeight: 600,
    fontSize: "0.75rem",
  };
};

export const sprintDetailStyles: Record<string, SxProps<Theme>> = {
  backButton: {
    mb: 2,
    color: "grayscale.600",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 3,
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  title: {
    color: "grayscale.900",
    fontWeight: 600,
  },
  description: {
    color: "grayscale.600",
    maxWidth: 600,
  },
  metaRow: {
    display: "flex",
    gap: 3,
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaLabel: {
    color: "grayscale.500",
    fontSize: "0.875rem",
  },
  metaValue: {
    color: "grayscale.800",
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  actionButtons: {
    display: "flex",
    gap: 1,
  },
  sectionTitle: {
    color: "grayscale.900",
    fontWeight: 600,
    mb: 2,
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  tableContainer: {
    bgcolor: "grayscale.0",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grayscale.100",
    overflowX: "auto",
    overflowY: "hidden",
    mb: 4,
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
  emptyState: {
    textAlign: "center",
    py: 4,
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
  taskSearchField: {
    mb: 2,
  },
  taskListContainer: {
    maxHeight: 400,
    overflow: "auto",
  },
  taskListItem: {
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  orderBadge: {
    bgcolor: "grayscale.100",
    color: "grayscale.700",
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 600,
    flexShrink: 0,
  },
};
