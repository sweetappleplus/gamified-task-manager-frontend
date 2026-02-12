import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PaidIcon from "@mui/icons-material/Paid";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Task, TASK_STATUSES } from "types";
import {
  tasksStyles,
  getStatusChipSx,
  getPriorityChipSx,
} from "../Tasks.styles";
import { formatDate } from "utils";

type TaskTableProps = {
  tasks: Task[];
  total: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onAssign: (task: Task) => void;
  onReview: (task: Task) => void;
  onMarkPaid: (task: Task) => void;
  onCancel: (task: Task) => void;
  onViewDetail: (task: Task) => void;
};

const TaskTable = ({
  tasks,
  total,
  page,
  rowsPerPage,
  isLoading,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onAssign,
  onReview,
  onMarkPaid,
  onCancel,
  onViewDetail,
}: TaskTableProps) => {
  if (isLoading) {
    return (
      <Box sx={tasksStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return (
      <Box sx={tasksStyles.emptyState}>
        <Typography variant="body1">No tasks found</Typography>
      </Box>
    );
  }

  const renderActions = (task: Task) => {
    const actions: React.ReactNode[] = [];

    actions.push(
      <Tooltip title="View" key="view">
        <IconButton
          size="small"
          onClick={() => onViewDetail(task)}
          sx={{ color: "grayscale.500" }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );

    switch (task.status) {
      case TASK_STATUSES.NEW:
        actions.push(
          <Tooltip title="Edit" key="edit">
            <IconButton
              size="small"
              onClick={() => onEdit(task)}
              sx={{ color: "primary.main" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Assign" key="assign">
            <IconButton
              size="small"
              onClick={() => onAssign(task)}
              sx={{ color: "additional.green.main" }}
            >
              <PersonAddIcon fontSize="small" />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Delete" key="delete">
            <IconButton
              size="small"
              onClick={() => onDelete(task)}
              sx={{ color: "additional.red.main" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.PENDING:
        actions.push(
          <Tooltip title="Edit" key="edit">
            <IconButton
              size="small"
              onClick={() => onEdit(task)}
              sx={{ color: "primary.main" }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>,
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              size="small"
              onClick={() => onCancel(task)}
              sx={{ color: "additional.orange.main" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.IN_ACTION:
        actions.push(
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              size="small"
              onClick={() => onCancel(task)}
              sx={{ color: "additional.orange.main" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.IN_REVIEW:
      case TASK_STATUSES.LATE:
        actions.push(
          <Tooltip title="Review" key="review">
            <IconButton
              size="small"
              onClick={() => onReview(task)}
              sx={{ color: "primary.main" }}
            >
              <RateReviewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.COMPLETED:
        actions.push(
          <Tooltip title="Mark Paid" key="paid">
            <IconButton
              size="small"
              onClick={() => onMarkPaid(task)}
              sx={{ color: "additional.green.main" }}
            >
              <PaidIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.FAILED:
        actions.push(
          <Tooltip title="Cancel" key="cancel">
            <IconButton
              size="small"
              onClick={() => onCancel(task)}
              sx={{ color: "additional.orange.main" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;

      case TASK_STATUSES.CANCELLED:
        actions.push(
          <Tooltip title="Delete" key="delete">
            <IconButton
              size="small"
              onClick={() => onDelete(task)}
              sx={{ color: "additional.red.main" }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
        break;
    }

    return actions;
  };

  return (
    <TableContainer sx={tasksStyles.tableContainer}>
      <Table>
        <TableHead sx={tasksStyles.tableHead}>
          <TableRow>
            <TableCell sx={tasksStyles.tableHeadCell}>Title</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Status</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Priority</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Type</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Category</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Assigned To</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell}>Deadline</TableCell>
            <TableCell sx={tasksStyles.tableHeadCell} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              hover
              sx={{ "&:hover": { bgcolor: "grayscale.50" } }}
            >
              <TableCell sx={tasksStyles.truncatedCell}>{task.title}</TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                <Chip
                  label={task.status.replace(/_/g, " ")}
                  size="small"
                  sx={getStatusChipSx(task.status)}
                />
              </TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                <Chip
                  label={task.priority}
                  size="small"
                  sx={getPriorityChipSx(task.priority)}
                />
              </TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                {task.type.replace(/_/g, " ")}
              </TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                {task.category?.name ?? "—"}
              </TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                {task.assignedTo?.name || task.assignedTo?.email || "—"}
              </TableCell>
              <TableCell sx={tasksStyles.tableCell}>
                {formatDate(task.deadline)}
              </TableCell>
              <TableCell sx={tasksStyles.tableCell} align="right">
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}
                >
                  {renderActions(task)}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={tasksStyles.paginationContainer}>
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Box>
    </TableContainer>
  );
};

export default TaskTable;
