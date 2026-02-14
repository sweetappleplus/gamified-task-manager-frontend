import {
  Box,
  Typography,
  Chip,
  Link,
  Button,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdminLayout } from "components";
import { ROUTES, BACKEND_URL } from "consts";
import { TASK_STATUSES } from "types";
import { formatDateTime } from "utils";
import { getStatusChipSx, getPriorityChipSx } from "../Tasks/Tasks.styles";
import {
  ReviewTaskDialog,
  AssignTaskDialog,
  ConfirmDialog,
  SubmissionHistory,
} from "../Tasks/components";
import { useAdminTaskDetailPage } from "./hooks";
import { adminTaskDetailStyles as styles } from "./TaskDetail.styles";

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={styles.detailLabel}>{label}</Typography>
    <Box sx={styles.detailValue}>{children}</Box>
  </Box>
);

const AdminTaskDetail = () => {
  const {
    task,
    isLoading,
    workers,
    isSubmitting,
    reviewTarget,
    assignTarget,
    cancelTarget,
    deleteTarget,
    openReviewDialog,
    closeReviewDialog,
    openAssignDialog,
    closeAssignDialog,
    openCancelDialog,
    closeCancelDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleReview,
    handleAssign,
    handleCancel,
    handleDelete,
    handleBack,
  } = useAdminTaskDetailPage();

  if (isLoading) {
    return (
      <AdminLayout activeRoute={ROUTES.ADMIN_TASKS.path}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  if (!task) {
    return (
      <AdminLayout activeRoute={ROUTES.ADMIN_TASKS.path}>
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" sx={{ color: "grayscale.500" }}>
            Task not found
          </Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  const renderActions = () => {
    const actions: React.ReactNode[] = [];

    switch (task.status) {
      case TASK_STATUSES.NEW:
        actions.push(
          <Button
            key="assign"
            variant="contained"
            color="primary"
            onClick={openAssignDialog}
          >
            Assign
          </Button>,
          <Button
            key="delete"
            variant="outlined"
            color="error"
            onClick={openDeleteDialog}
          >
            Delete
          </Button>
        );
        break;

      case TASK_STATUSES.PENDING:
        actions.push(
          <Button
            key="cancel"
            variant="outlined"
            color="warning"
            onClick={openCancelDialog}
          >
            Cancel
          </Button>
        );
        break;

      case TASK_STATUSES.IN_ACTION:
        actions.push(
          <Button
            key="cancel"
            variant="outlined"
            color="warning"
            onClick={openCancelDialog}
          >
            Cancel
          </Button>
        );
        break;

      case TASK_STATUSES.IN_REVIEW:
      case TASK_STATUSES.LATE:
        actions.push(
          <Button
            key="review"
            variant="contained"
            color="primary"
            onClick={openReviewDialog}
          >
            Review
          </Button>
        );
        break;

      case TASK_STATUSES.FAILED:
        actions.push(
          <Button
            key="cancel"
            variant="outlined"
            color="warning"
            onClick={openCancelDialog}
          >
            Cancel
          </Button>
        );
        break;

      case TASK_STATUSES.CANCELLED:
        actions.push(
          <Button
            key="delete"
            variant="outlined"
            color="error"
            onClick={openDeleteDialog}
          >
            Delete
          </Button>
        );
        break;
    }

    return actions;
  };

  return (
    <AdminLayout activeRoute={ROUTES.ADMIN_TASKS.path}>
      <Box>
        {/* Header */}
        <Box sx={styles.header}>
          <Box sx={styles.titleRow}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={handleBack}
              color="inherit"
            >
              Back
            </Button>
            <Typography variant="h5" sx={styles.title}>
              Task Details
            </Typography>
          </Box>
          <Box sx={styles.actionsRow}>{renderActions()}</Box>
        </Box>

        {/* Title & Status */}
        <Box sx={styles.section}>
          <DetailRow label="Title">
            <Typography variant="h6">{task.title}</Typography>
          </DetailRow>

          <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
            <Chip
              label={task.status.replace(/_/g, " ")}
              size="small"
              sx={getStatusChipSx(task.status)}
            />
            <Chip
              label={task.priority}
              size="small"
              sx={getPriorityChipSx(task.priority)}
            />
          </Box>

          <DetailRow label="Description">
            <Typography variant="body2">{task.description}</Typography>
          </DetailRow>

          {task.steps.length > 0 && (
            <DetailRow label="Steps">
              {task.steps.map((step, i) => (
                <Typography
                  key={i}
                  variant="body2"
                  sx={{ color: "grayscale.700", ml: 1, mb: 0.5 }}
                >
                  {i + 1}. {step}
                </Typography>
              ))}
            </DetailRow>
          )}
        </Box>

        {/* Metadata */}
        <Box sx={styles.section}>
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Details
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <DetailRow label="Type">
              <Typography variant="body2">
                {task.type.replace(/_/g, " ")}
              </Typography>
            </DetailRow>
            <DetailRow label="Category">
              <Typography variant="body2">
                {task.category?.name ?? "\u2014"}
              </Typography>
            </DetailRow>
            <DetailRow label="Budget">
              <Typography variant="body2">${task.budget}</Typography>
            </DetailRow>
            <DetailRow label="Commission">
              <Typography variant="body2">{task.commissionPercent}%</Typography>
            </DetailRow>
            <DetailRow label="Time to Complete">
              <Typography variant="body2">
                {task.timeToCompleteMin} min
              </Typography>
            </DetailRow>
            <DetailRow label="Max Delay">
              <Typography variant="body2">
                {task.maxSubmissionDelayMin} min
              </Typography>
            </DetailRow>
          </Box>
        </Box>

        {/* People */}
        <Box sx={styles.section}>
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            People
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <DetailRow label="Assigned To">
              <Typography variant="body2">
                {task.assignedTo
                  ? task.assignedTo.name || task.assignedTo.email
                  : "Unassigned"}
              </Typography>
            </DetailRow>
            <DetailRow label="Created By">
              <Typography variant="body2">
                {task.createdBy?.name || task.createdBy?.email || "\u2014"}
              </Typography>
            </DetailRow>
          </Box>
        </Box>

        {/* Timeline */}
        <Box sx={styles.section}>
          <Typography variant="subtitle2" sx={styles.sectionTitle}>
            Timeline
          </Typography>
          <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <DetailRow label="Created At">
              <Typography variant="body2">
                {formatDateTime(task.createdAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Deadline">
              <Typography variant="body2">
                {formatDateTime(task.deadline)}
              </Typography>
            </DetailRow>
            <DetailRow label="Assigned At">
              <Typography variant="body2">
                {formatDateTime(task.assignedAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Started At">
              <Typography variant="body2">
                {formatDateTime(task.startedAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Submitted At">
              <Typography variant="body2">
                {formatDateTime(task.submittedAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Completed At">
              <Typography variant="body2">
                {formatDateTime(task.completedAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Cancelled At">
              <Typography variant="body2">
                {formatDateTime(task.cancelledAt)}
              </Typography>
            </DetailRow>
            <DetailRow label="Paid At">
              <Typography variant="body2">
                {formatDateTime(task.paidAt)}
              </Typography>
            </DetailRow>
          </Box>
        </Box>

        {/* Files */}
        {task.files && task.files.length > 0 && (
          <Box sx={styles.section}>
            <Typography variant="subtitle2" sx={styles.sectionTitle}>
              Attached Files ({task.files.length})
            </Typography>
            {task.files.map((file) => (
              <Box key={file.id} sx={{ mb: 1 }}>
                <Link
                  href={`${BACKEND_URL}${file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: "primary.main" }}
                >
                  {file.fileName}
                </Link>
                <Typography
                  variant="caption"
                  sx={{ color: "grayscale.400", ml: 1 }}
                >
                  ({(file.fileSize / 1024).toFixed(1)} KB)
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Submission History */}
        {task.submissions && task.submissions.length > 0 && (
          <Box sx={styles.section}>
            <SubmissionHistory submissions={task.submissions} />
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <ReviewTaskDialog
        open={reviewTarget !== null}
        task={reviewTarget}
        isSubmitting={isSubmitting}
        onClose={closeReviewDialog}
        onReview={handleReview}
      />

      <AssignTaskDialog
        open={assignTarget !== null}
        task={assignTarget}
        workers={workers}
        isSubmitting={isSubmitting}
        onClose={closeAssignDialog}
        onAssign={handleAssign}
      />

      <ConfirmDialog
        open={cancelTarget !== null}
        title="Cancel Task"
        message={`Are you sure you want to cancel "${task.title}"? This action cannot be undone.`}
        confirmLabel="Cancel Task"
        confirmColor="warning"
        isSubmitting={isSubmitting}
        onClose={closeCancelDialog}
        onConfirm={handleCancel}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmColor="error"
        isSubmitting={isSubmitting}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </AdminLayout>
  );
};

export default AdminTaskDetail;
