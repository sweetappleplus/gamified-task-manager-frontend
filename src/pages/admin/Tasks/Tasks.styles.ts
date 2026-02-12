import { SxProps, Theme } from "@mui/material";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskPriority,
  TaskStatus,
} from "types";
import { STATUS_COLORS, PRIORITY_COLORS } from "consts";

export const tasksStyles: Record<string, SxProps<Theme>> = {
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
  dialogContent: {},
  dialogTitle: {
    fontWeight: 600,
  },
  dialogActions: {
    px: 3,
    pb: 2,
  },
  textField: {},
  selectField: {},
  deleteDialogText: {
    color: "grayscale.600",
  },
  paginationContainer: {
    borderTop: "1px solid",
    borderColor: "grayscale.100",
  },
  detailLabel: {
    color: "grayscale.500",
    fontSize: "0.75rem",
    mb: 0.5,
  },
  detailValue: {
    color: "grayscale.900",
    mb: 2,
  },
};

export const getStatusChipSx = (status: TaskStatus) => {
  const colors = STATUS_COLORS[status] ?? {
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

export const getPriorityChipSx = (priority: TaskPriority) => {
  const colors = PRIORITY_COLORS[priority] ?? {
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

export const getStatusColor = (
  status: TaskStatus
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  const map: Record<
    TaskStatus,
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  > = {
    [TASK_STATUSES.NEW]: "info",
    [TASK_STATUSES.PENDING]: "warning",
    [TASK_STATUSES.IN_ACTION]: "primary",
    [TASK_STATUSES.IN_REVIEW]: "secondary",
    [TASK_STATUSES.COMPLETED]: "success",
    [TASK_STATUSES.LATE]: "error",
    [TASK_STATUSES.PAID]: "success",
    [TASK_STATUSES.FAILED]: "error",
    [TASK_STATUSES.CANCELLED]: "default",
  };
  return map[status] ?? "default";
};

export const getPriorityColor = (
  priority: TaskPriority
): "default" | "primary" | "error" | "warning" => {
  const map: Record<TaskPriority, "default" | "primary" | "error" | "warning"> =
    {
      [TASK_PRIORITIES.LOW]: "default",
      [TASK_PRIORITIES.MEDIUM]: "warning",
      [TASK_PRIORITIES.HIGH]: "error",
    };
  return map[priority] ?? "default";
};
