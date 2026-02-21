import { useState } from "react";
import { useLocation } from "react-router-dom";
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
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { AdminLayout } from "components";
import { useSprintDetailPage } from "./hooks";
import {
  sprintDetailStyles,
  getSprintStatusChipSx,
  getTaskStatusChipSx,
  getPriorityChipSx,
} from "./SprintDetail.styles";
import { SPRINT_STATUSES } from "types";
import { formatDateTime } from "utils";

const SprintDetail = () => {
  const location = useLocation();
  const {
    sprint,
    isLoading,
    isSubmitting,
    dialogMode,
    availableTasks,
    isLoadingTasks,
    selectedTaskIds,
    taskSearch,
    progress,
    maxTasksToAdd,
    canAddMoreTasks,
    canRemoveTasks,
    canActivate,
    canComplete,
    openEditDialog,
    openAddTasksDialog,
    closeDialog,
    handleEdit,
    handleAddTasks,
    handleRemoveTask,
    handleActivate,
    handleComplete,
    toggleTaskSelection,
    setTaskSearch,
    goBack,
  } = useSprintDetailPage();

  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const handleOpenEdit = () => {
    if (!sprint) return;
    setEditName(sprint.name);
    setEditDescription(sprint.description ?? "");
    const toLocalDatetime = (iso: string) => {
      const d = new Date(iso);
      const offset = d.getTimezoneOffset();
      const local = new Date(d.getTime() - offset * 60000);
      return local.toISOString().slice(0, 16);
    };
    setEditStartDate(toLocalDatetime(sprint.startDate));
    setEditEndDate(toLocalDatetime(sprint.endDate));
    openEditDialog();
  };

  const handleSubmitEdit = () => {
    handleEdit({
      name: editName.trim(),
      ...(editDescription.trim()
        ? { description: editDescription.trim() }
        : {}),
      startDate: new Date(editStartDate).toISOString(),
      endDate: new Date(editEndDate).toISOString(),
    });
  };

  const isEditFormValid =
    editName.trim().length > 0 &&
    editName.trim().length <= 255 &&
    editStartDate.length > 0 &&
    editEndDate.length > 0 &&
    new Date(editEndDate) > new Date(editStartDate);

  if (isLoading || !sprint) {
    return (
      <AdminLayout activeRoute={location.pathname}>
        <Box sx={sprintDetailStyles.loadingContainer}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  const isDraft = sprint.status === SPRINT_STATUSES.DRAFT;
  const isActive = sprint.status === SPRINT_STATUSES.ACTIVE;
  const showProgress = isActive || sprint.status === SPRINT_STATUSES.COMPLETED;

  return (
    <AdminLayout activeRoute="/admin/sprints">
      <Box>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
          sx={sprintDetailStyles.backButton}
        >
          Back to Sprints
        </Button>

        {/* Header */}
        <Box sx={sprintDetailStyles.headerContainer}>
          <Box sx={sprintDetailStyles.headerInfo}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h5" sx={sprintDetailStyles.title}>
                {sprint.name}
              </Typography>
              <Chip
                label={sprint.status}
                size="small"
                sx={getSprintStatusChipSx(sprint.status)}
              />
            </Box>
            {sprint.description && (
              <Typography variant="body2" sx={sprintDetailStyles.description}>
                {sprint.description}
              </Typography>
            )}
            <Box sx={sprintDetailStyles.metaRow}>
              <Box>
                <Typography component="span" sx={sprintDetailStyles.metaLabel}>
                  Start:{" "}
                </Typography>
                <Typography component="span" sx={sprintDetailStyles.metaValue}>
                  {formatDateTime(sprint.startDate)}
                </Typography>
              </Box>
              <Box>
                <Typography component="span" sx={sprintDetailStyles.metaLabel}>
                  End:{" "}
                </Typography>
                <Typography component="span" sx={sprintDetailStyles.metaValue}>
                  {formatDateTime(sprint.endDate)}
                </Typography>
              </Box>
              <Box>
                <Typography component="span" sx={sprintDetailStyles.metaLabel}>
                  Created by:{" "}
                </Typography>
                <Typography component="span" sx={sprintDetailStyles.metaValue}>
                  {sprint.createdBy?.name ?? sprint.createdBy?.email ?? "—"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={sprintDetailStyles.actionButtons}>
            {isDraft && (
              <Tooltip title="Edit Sprint">
                <IconButton
                  onClick={handleOpenEdit}
                  sx={{ color: "primary.main" }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            {canActivate && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<PlayArrowIcon />}
                onClick={handleActivate}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Activating..." : "Activate"}
              </Button>
            )}
            {canComplete && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={handleComplete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Completing..." : "Complete"}
              </Button>
            )}
          </Box>
        </Box>

        {/* Sprint Tasks Section */}
        <Box sx={sprintDetailStyles.sectionHeader}>
          <Typography variant="h6" sx={sprintDetailStyles.sectionTitle}>
            Tasks ({sprint.tasks?.length ?? 0}/8)
          </Typography>
          {canAddMoreTasks && (
            <Tooltip title="Add Tasks">
              <IconButton
                onClick={openAddTasksDialog}
                sx={{ color: "primary.main" }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {!sprint.tasks || sprint.tasks.length === 0 ? (
          <Box sx={sprintDetailStyles.emptyState}>
            <Typography variant="body1">
              No tasks added yet. Add 5-8 tasks to this sprint.
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={sprintDetailStyles.tableContainer}>
            <Table>
              <TableHead sx={sprintDetailStyles.tableHead}>
                <TableRow>
                  <TableCell sx={sprintDetailStyles.tableHeadCell}>
                    Order
                  </TableCell>
                  <TableCell sx={sprintDetailStyles.tableHeadCell}>
                    Title
                  </TableCell>
                  <TableCell sx={sprintDetailStyles.tableHeadCell}>
                    Status
                  </TableCell>
                  <TableCell sx={sprintDetailStyles.tableHeadCell}>
                    Priority
                  </TableCell>
                  <TableCell sx={sprintDetailStyles.tableHeadCell}>
                    Type
                  </TableCell>
                  {isDraft && (
                    <TableCell
                      sx={sprintDetailStyles.tableHeadCell}
                      align="right"
                    >
                      Actions
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {sprint.tasks.map((sprintTask) => (
                  <TableRow key={sprintTask.id}>
                    <TableCell sx={sprintDetailStyles.tableCell}>
                      <Box sx={sprintDetailStyles.orderBadge}>
                        {sprintTask.order}
                      </Box>
                    </TableCell>
                    <TableCell sx={sprintDetailStyles.tableCell}>
                      {sprintTask.task.title}
                    </TableCell>
                    <TableCell sx={sprintDetailStyles.tableCell}>
                      <Chip
                        label={sprintTask.task.status}
                        size="small"
                        sx={getTaskStatusChipSx(sprintTask.task.status)}
                      />
                    </TableCell>
                    <TableCell sx={sprintDetailStyles.tableCell}>
                      <Chip
                        label={sprintTask.task.priority}
                        size="small"
                        sx={getPriorityChipSx(sprintTask.task.priority)}
                      />
                    </TableCell>
                    <TableCell sx={sprintDetailStyles.tableCell}>
                      {sprintTask.task.type}
                    </TableCell>
                    {isDraft && (
                      <TableCell
                        sx={sprintDetailStyles.tableCell}
                        align="right"
                      >
                        <Tooltip
                          title={
                            canRemoveTasks
                              ? "Remove from sprint"
                              : "Minimum 5 tasks required"
                          }
                        >
                          <span>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleRemoveTask(sprintTask.task.id)
                              }
                              disabled={!canRemoveTasks || isSubmitting}
                              sx={{ color: "additional.red.main" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Progress Section */}
        {showProgress && (
          <>
            <Typography variant="h6" sx={sprintDetailStyles.sectionTitle}>
              Worker Progress
            </Typography>
            {progress.length === 0 ? (
              <Box sx={sprintDetailStyles.emptyState}>
                <Typography variant="body1">
                  No workers have started this sprint yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer sx={sprintDetailStyles.tableContainer}>
                <Table>
                  <TableHead sx={sprintDetailStyles.tableHead}>
                    <TableRow>
                      <TableCell sx={sprintDetailStyles.tableHeadCell}>
                        Worker
                      </TableCell>
                      <TableCell sx={sprintDetailStyles.tableHeadCell}>
                        Progress
                      </TableCell>
                      <TableCell sx={sprintDetailStyles.tableHeadCell}>
                        Started At
                      </TableCell>
                      <TableCell sx={sprintDetailStyles.tableHeadCell}>
                        Completed At
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {progress.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell sx={sprintDetailStyles.tableCell}>
                          {p.user.name ?? p.user.email}
                        </TableCell>
                        <TableCell sx={sprintDetailStyles.tableCell}>
                          {p.tasksCompleted}/{p.totalTasks}
                        </TableCell>
                        <TableCell sx={sprintDetailStyles.tableCell}>
                          {formatDateTime(p.startedAt)}
                        </TableCell>
                        <TableCell sx={sprintDetailStyles.tableCell}>
                          {formatDateTime(p.completedAt)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        {/* Edit Sprint Dialog */}
        <Dialog
          open={dialogMode === "edit"}
          onClose={closeDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={sprintDetailStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Edit Sprint
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={sprintDetailStyles.dialogContent}>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              required
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              inputProps={{ maxLength: 255 }}
              sx={{ mt: 1 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Start Date & Time"
              type="datetime-local"
              fullWidth
              required
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mt: 2 }}
            />
            <TextField
              label="End Date & Time"
              type="datetime-local"
              fullWidth
              required
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              sx={{ mt: 2 }}
              helperText={
                editStartDate &&
                editEndDate &&
                new Date(editEndDate) <= new Date(editStartDate)
                  ? "End date must be after start date"
                  : ""
              }
              error={
                !!(
                  editStartDate &&
                  editEndDate &&
                  new Date(editEndDate) <= new Date(editStartDate)
                )
              }
            />
          </DialogContent>
          <DialogActions sx={sprintDetailStyles.dialogActions}>
            <Button
              onClick={handleSubmitEdit}
              variant="contained"
              disabled={!isEditFormValid || isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Tasks Dialog */}
        <Dialog
          open={dialogMode === "addTasks"}
          onClose={closeDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={sprintDetailStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Add Tasks to Sprint (max {maxTasksToAdd} more)
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={sprintDetailStyles.dialogContent}>
            <TextField
              label="Search tasks"
              fullWidth
              value={taskSearch}
              onChange={(e) => setTaskSearch(e.target.value)}
              sx={sprintDetailStyles.taskSearchField}
            />
            {isLoadingTasks ? (
              <Box sx={sprintDetailStyles.loadingContainer}>
                <CircularProgress size={24} />
              </Box>
            ) : availableTasks.length === 0 ? (
              <Box sx={sprintDetailStyles.emptyState}>
                <Typography variant="body2">
                  No available tasks found (only NEW or PENDING tasks can be
                  added)
                </Typography>
              </Box>
            ) : (
              <List sx={sprintDetailStyles.taskListContainer}>
                {availableTasks.map((task) => {
                  const isSelected = selectedTaskIds.includes(task.id);
                  const isDisabled =
                    !isSelected && selectedTaskIds.length >= maxTasksToAdd;

                  return (
                    <ListItem
                      key={task.id}
                      disablePadding
                      sx={sprintDetailStyles.taskListItem}
                    >
                      <ListItemButton
                        onClick={() => toggleTaskSelection(task.id)}
                        disabled={isDisabled}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={isSelected}
                            disabled={isDisabled}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={task.title}
                          secondary={
                            <Box
                              component="span"
                              sx={{ display: "flex", gap: 1, mt: 0.5 }}
                            >
                              <Chip
                                label={task.status}
                                size="small"
                                sx={getTaskStatusChipSx(task.status)}
                              />
                              <Chip
                                label={task.priority}
                                size="small"
                                sx={getPriorityChipSx(task.priority)}
                              />
                              <Chip
                                label={task.type}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </DialogContent>
          <DialogActions sx={sprintDetailStyles.dialogActions}>
            <Typography
              variant="body2"
              sx={{ color: "grayscale.500", mr: "auto" }}
            >
              {selectedTaskIds.length} task(s) selected
            </Typography>
            <Button
              onClick={handleAddTasks}
              variant="contained"
              disabled={selectedTaskIds.length === 0 || isSubmitting}
            >
              {isSubmitting
                ? "Adding..."
                : `Add ${selectedTaskIds.length} Task(s)`}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default SprintDetail;
