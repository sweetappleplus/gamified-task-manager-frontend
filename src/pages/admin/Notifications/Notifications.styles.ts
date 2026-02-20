import { SxProps, Theme } from "@mui/material";
import { NotificationType, NOTIFICATION_TYPES } from "types";

export const notificationsStyles: Record<string, SxProps<Theme>> = {
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
  headerActions: {
    display: "flex",
    gap: 1.5,
    alignItems: "center",
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

const NOTIFICATION_TYPE_COLORS: Record<
  NotificationType,
  { bg: string; text: string }
> = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: {
    bg: "primary.50",
    text: "primary.600",
  },
  [NOTIFICATION_TYPES.TASK_APPROVED]: {
    bg: "additional.green.200",
    text: "additional.green.main",
  },
  [NOTIFICATION_TYPES.TASK_REJECTED]: {
    bg: "additional.red.200",
    text: "additional.red.main",
  },
  [NOTIFICATION_TYPES.TASK_CANCELLED]: {
    bg: "additional.orange.200",
    text: "additional.orange.main",
  },
  [NOTIFICATION_TYPES.PAYMENT_RECORDED]: {
    bg: "additional.green.200",
    text: "additional.green.main",
  },
  [NOTIFICATION_TYPES.WORKER_JOINED]: {
    bg: "primary.50",
    text: "primary.600",
  },
  [NOTIFICATION_TYPES.TASK_SUBMITTED]: {
    bg: "additional.orange.200",
    text: "additional.orange.main",
  },
};

export const getNotificationTypeChipSx = (type: NotificationType) => {
  const colors = NOTIFICATION_TYPE_COLORS[type] ?? {
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

export const getReadChipSx = (isRead: boolean) => ({
  bgcolor: isRead ? "grayscale.50" : "additional.orange.200",
  color: isRead ? "grayscale.600" : "additional.orange.main",
  fontWeight: 600,
  border: "none",
});

export const getDeliveredChipSx = (isDelivered: boolean) => ({
  bgcolor: isDelivered ? "additional.green.200" : "grayscale.50",
  color: isDelivered ? "additional.green.main" : "grayscale.600",
  fontWeight: 600,
  border: "none",
});
