import { SxProps, Theme } from "@mui/material";
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskPriority,
  TaskStatus,
} from "types";

export const tasksStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  title: {
    color: "grayscale.0",
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
    "& .MuiOutlinedInput-root": {
      color: "grayscale.0",
      "& fieldset": { borderColor: "grayscale.600" },
      "&:hover fieldset": { borderColor: "grayscale.400" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root": { color: "grayscale.400" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
    "& .MuiSelect-icon": { color: "grayscale.400" },
  },
  searchField: {
    minWidth: 200,
    "& .MuiOutlinedInput-root": {
      color: "grayscale.0",
      "& fieldset": { borderColor: "grayscale.600" },
      "&:hover fieldset": { borderColor: "grayscale.400" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root": { color: "grayscale.400" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  },
  tableContainer: {
    bgcolor: "grayscale.800",
    borderRadius: 2,
    overflow: "hidden",
  },
  tableHead: {
    bgcolor: "grayscale.900",
  },
  tableHeadCell: {
    color: "grayscale.400",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.700",
    whiteSpace: "nowrap",
  },
  tableCell: {
    color: "grayscale.0",
    borderBottom: "1px solid",
    borderColor: "grayscale.700",
  },
  truncatedCell: {
    color: "grayscale.300",
    borderBottom: "1px solid",
    borderColor: "grayscale.700",
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emptyState: {
    textAlign: "center",
    py: 6,
    color: "grayscale.400",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    py: 6,
  },
  dialogContent: {
    bgcolor: "grayscale.800",
  },
  dialogTitle: {
    color: "grayscale.0",
    bgcolor: "grayscale.800",
  },
  dialogActions: {
    bgcolor: "grayscale.800",
    px: 3,
    pb: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "grayscale.0",
      "& fieldset": { borderColor: "grayscale.600" },
      "&:hover fieldset": { borderColor: "grayscale.400" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root": { color: "grayscale.400" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
  },
  selectField: {
    "& .MuiOutlinedInput-root": {
      color: "grayscale.0",
      "& fieldset": { borderColor: "grayscale.600" },
      "&:hover fieldset": { borderColor: "grayscale.400" },
      "&.Mui-focused fieldset": { borderColor: "primary.main" },
    },
    "& .MuiInputLabel-root": { color: "grayscale.400" },
    "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
    "& .MuiSelect-icon": { color: "grayscale.400" },
  },
  deleteDialogText: {
    color: "grayscale.300",
  },
  paginationContainer: {
    borderTop: "1px solid",
    borderColor: "grayscale.700",
    "& .MuiTablePagination-root": { color: "grayscale.300" },
    "& .MuiTablePagination-selectIcon": { color: "grayscale.400" },
    "& .MuiIconButton-root": { color: "grayscale.400" },
    "& .MuiIconButton-root.Mui-disabled": { color: "grayscale.700" },
  },
  detailLabel: {
    color: "grayscale.400",
    fontSize: "0.75rem",
    mb: 0.5,
  },
  detailValue: {
    color: "grayscale.0",
    mb: 2,
  },
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
