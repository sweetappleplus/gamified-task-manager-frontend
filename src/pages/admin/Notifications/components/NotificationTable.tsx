import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  AdminNotification,
  NotificationSortBy,
  NotificationSortOrder,
  NOTIFICATION_TYPES,
} from "types";
import {
  notificationsStyles,
  getNotificationTypeChipSx,
  getReadChipSx,
  getDeliveredChipSx,
} from "../Notifications.styles";
import { formatDateTime } from "utils";

type NotificationTableProps = {
  notifications: AdminNotification[];
  total: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
  isSubmitting: boolean;
  sortBy?: NotificationSortBy;
  sortOrder?: NotificationSortOrder;
  selectedIds: string[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange: (sortBy: NotificationSortBy) => void;
  onDelete: (id: string) => void;
  onSelectEntry: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
};

const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: "Task Assigned",
  [NOTIFICATION_TYPES.TASK_APPROVED]: "Task Approved",
  [NOTIFICATION_TYPES.TASK_REJECTED]: "Task Rejected",
  [NOTIFICATION_TYPES.TASK_CANCELLED]: "Task Cancelled",
  [NOTIFICATION_TYPES.PAYMENT_RECORDED]: "Payment Recorded",
  [NOTIFICATION_TYPES.WORKER_JOINED]: "Worker Joined",
  [NOTIFICATION_TYPES.TASK_SUBMITTED]: "Task Submitted",
};

const NotificationTable = ({
  notifications,
  total,
  page,
  rowsPerPage,
  isLoading,
  isSubmitting,
  sortBy,
  sortOrder,
  selectedIds,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onDelete,
  onSelectEntry,
  onSelectAll,
}: NotificationTableProps) => {
  const totalPages = Math.ceil(total / rowsPerPage) || 1;
  const [pageInput, setPageInput] = useState(String(page));

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const parsed = parseInt(pageInput, 10);
    if (parsed >= 1 && parsed <= totalPages && parsed !== page) {
      onPageChange(parsed);
    } else {
      setPageInput(String(page));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  if (isLoading) {
    return (
      <Box sx={notificationsStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (notifications.length === 0) {
    return (
      <Box sx={notificationsStyles.emptyState}>
        <Typography variant="body1">No notifications found</Typography>
      </Box>
    );
  }

  const allSelected =
    notifications.length > 0 &&
    notifications.every((n) => selectedIds.includes(n.id));

  return (
    <Box sx={notificationsStyles.tableContainer}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={notificationsStyles.tableHead}>
              <TableCell
                sx={notificationsStyles.tableHeadCell}
                padding="checkbox"
              >
                <Checkbox
                  size="small"
                  checked={allSelected}
                  indeterminate={selectedIds.length > 0 && !allSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </TableCell>
              <TableCell
                sx={notificationsStyles.sortableHeadCell}
                sortDirection={
                  sortBy === "createdAt" ? (sortOrder as "asc" | "desc") : false
                }
              >
                <TableSortLabel
                  active={sortBy === "createdAt"}
                  direction={
                    sortBy === "createdAt"
                      ? (sortOrder as "asc" | "desc")
                      : "asc"
                  }
                  onClick={() => onSortChange("createdAt")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>
                Recipient
              </TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>Type</TableCell>
              <TableCell
                sx={notificationsStyles.sortableHeadCell}
                sortDirection={
                  sortBy === "title" ? (sortOrder as "asc" | "desc") : false
                }
              >
                <TableSortLabel
                  active={sortBy === "title"}
                  direction={
                    sortBy === "title" ? (sortOrder as "asc" | "desc") : "asc"
                  }
                  onClick={() => onSortChange("title")}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>
                Message
              </TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>Read</TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>
                Delivered
              </TableCell>
              <TableCell sx={notificationsStyles.tableHeadCell}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id} hover>
                <TableCell
                  sx={notificationsStyles.tableCell}
                  padding="checkbox"
                >
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(notification.id)}
                    onChange={() => onSelectEntry(notification.id)}
                  />
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  {formatDateTime(notification.createdAt)}
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  {notification.user?.name ||
                    notification.user?.email ||
                    notification.userId}
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  <Chip
                    label={
                      NOTIFICATION_TYPE_LABELS[notification.type] ??
                      notification.type
                    }
                    size="small"
                    variant="outlined"
                    sx={getNotificationTypeChipSx(notification.type)}
                  />
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  {notification.title}
                </TableCell>
                <TableCell sx={notificationsStyles.truncatedCell}>
                  {notification.message}
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  <Chip
                    label={notification.isRead ? "Read" : "Unread"}
                    size="small"
                    variant="outlined"
                    sx={getReadChipSx(notification.isRead)}
                  />
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  <Chip
                    label={notification.isDelivered ? "Yes" : "No"}
                    size="small"
                    variant="outlined"
                    sx={getDeliveredChipSx(notification.isDelivered)}
                  />
                </TableCell>
                <TableCell sx={notificationsStyles.tableCell}>
                  <Tooltip title="Delete">
                    <IconButton
                      size="small"
                      onClick={() => onDelete(notification.id)}
                      disabled={isSubmitting}
                      sx={{ color: "additional.red.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          ...notificationsStyles.paginationContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "grayscale.500" }}>
            Page
          </Typography>
          <TextField
            size="small"
            value={pageInput}
            onChange={handlePageInputChange}
            onBlur={handlePageInputSubmit}
            onKeyDown={handlePageInputKeyDown}
            sx={{ width: 60 }}
            inputProps={{
              style: { textAlign: "center", padding: "4px 8px" },
            }}
          />
          <Typography variant="body2" sx={{ color: "grayscale.500" }}>
            of {totalPages}
          </Typography>
        </Box>
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Box>
    </Box>
  );
};

export default NotificationTable;
