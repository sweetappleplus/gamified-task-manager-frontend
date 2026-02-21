import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { AdminLayout } from "components";
import { useSprintsPage } from "./hooks";
import { sprintsStyles, getStatusChipSx } from "./Sprints.styles";
import { Sprint, SPRINT_STATUSES, SprintStatus } from "types";
import { formatDateTime } from "utils";

const STATUS_FILTER_OPTIONS: Array<{
  label: string;
  value: SprintStatus | "ALL";
}> = [
  { label: "All", value: "ALL" },
  { label: "Draft", value: SPRINT_STATUSES.DRAFT },
  { label: "Active", value: SPRINT_STATUSES.ACTIVE },
  { label: "Completed", value: SPRINT_STATUSES.COMPLETED },
  { label: "Cancelled", value: SPRINT_STATUSES.CANCELLED },
];

const Sprints = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    sprints,
    isLoading,
    isSubmitting,
    dialogMode,
    deleteTarget,
    statusFilter,
    openCreateDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleCreate,
    handleDelete,
    handleStatusFilterChange,
  } = useSprintsPage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleOpenCreate = () => {
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    openCreateDialog();
  };

  const handleSubmit = () => {
    handleCreate({
      name: name.trim(),
      ...(description.trim() ? { description: description.trim() } : {}),
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
  };

  const isFormValid =
    name.trim().length > 0 &&
    name.trim().length <= 255 &&
    startDate.length > 0 &&
    endDate.length > 0 &&
    new Date(endDate) > new Date(startDate);

  const handleRowClick = (sprint: Sprint) => {
    navigate(`/admin/sprints/${sprint.id}`);
  };

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={sprintsStyles.header}>
          <Typography variant="h5" sx={sprintsStyles.title}>
            Daily Sprints
          </Typography>
          <Tooltip title="Create Sprint">
            <IconButton
              onClick={handleOpenCreate}
              sx={{ color: "primary.main" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={sprintsStyles.filterContainer}>
          {STATUS_FILTER_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              variant={statusFilter === option.value ? "filled" : "outlined"}
              color={statusFilter === option.value ? "primary" : "default"}
              onClick={() => handleStatusFilterChange(option.value)}
              sx={{ fontWeight: statusFilter === option.value ? 600 : 400 }}
            />
          ))}
        </Box>

        {isLoading ? (
          <Box sx={sprintsStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : sprints.length === 0 ? (
          <Box sx={sprintsStyles.emptyState}>
            <Typography variant="body1">No sprints found</Typography>
          </Box>
        ) : (
          <TableContainer sx={sprintsStyles.tableContainer}>
            <Table>
              <TableHead sx={sprintsStyles.tableHead}>
                <TableRow>
                  <TableCell sx={sprintsStyles.tableHeadCell}>Name</TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell}>Status</TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell}>
                    Start Date
                  </TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell}>
                    End Date
                  </TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell}>Tasks</TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell}>
                    Created By
                  </TableCell>
                  <TableCell sx={sprintsStyles.tableHeadCell} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sprints.map((sprint: Sprint) => (
                  <TableRow
                    key={sprint.id}
                    sx={sprintsStyles.clickableRow}
                    onClick={() => handleRowClick(sprint)}
                  >
                    <TableCell sx={sprintsStyles.tableCell}>
                      {sprint.name}
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell}>
                      <Chip
                        label={sprint.status}
                        size="small"
                        sx={getStatusChipSx(sprint.status)}
                      />
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell}>
                      {formatDateTime(sprint.startDate)}
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell}>
                      {formatDateTime(sprint.endDate)}
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell}>
                      {sprint.tasks?.length ?? 0}
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell}>
                      {sprint.createdBy?.name ?? sprint.createdBy?.email ?? "—"}
                    </TableCell>
                    <TableCell sx={sprintsStyles.tableCell} align="right">
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(sprint);
                          }}
                          sx={{ color: "primary.main" }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {sprint.status === SPRINT_STATUSES.DRAFT && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(sprint);
                            }}
                            sx={{ color: "additional.red.main" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Create Sprint Dialog */}
        <Dialog
          open={dialogMode !== null}
          onClose={closeDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={sprintsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Create Daily Sprint
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={sprintsStyles.dialogContent}>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 255 }}
              sx={{ mt: 1 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mt: 2 }}
              helperText={
                startDate && endDate && new Date(endDate) <= new Date(startDate)
                  ? "End date must be after start date"
                  : "Sprint window is typically 24 hours"
              }
              error={
                !!(
                  startDate &&
                  endDate &&
                  new Date(endDate) <= new Date(startDate)
                )
              }
            />
          </DialogContent>
          <DialogActions sx={sprintsStyles.dialogActions}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteTarget !== null}
          onClose={closeDeleteDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={sprintsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Delete Sprint
              <IconButton
                onClick={closeDeleteDialog}
                sx={{ color: "grayscale.500" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={sprintsStyles.dialogContent}>
            <Typography sx={sprintsStyles.deleteDialogText}>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={sprintsStyles.dialogActions}>
            <Button onClick={closeDeleteDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default Sprints;
