import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Chip,
  Divider,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task } from "types";
import { BACKEND_URL } from "consts";
import {
  tasksStyles,
  getStatusChipSx,
  getPriorityChipSx,
} from "../Tasks.styles";
import { formatDateTime } from "utils";

if (!BACKEND_URL) {
  throw new Error("REACT_APP_API_URL is not defined");
}

type TaskDetailDialogProps = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
};

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={tasksStyles.detailLabel}>{label}</Typography>
    <Box sx={tasksStyles.detailValue}>{children}</Box>
  </Box>
);

const TaskDetailDialog = ({ open, task, onClose }: TaskDetailDialogProps) => {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={tasksStyles.dialogTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Task Details
          <IconButton onClick={onClose} sx={{ color: "grayscale.500" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={tasksStyles.dialogContent}>
        <DetailRow label="Title">
          <Typography variant="h6">{task.title}</Typography>
        </DetailRow>

        <DetailRow label="Description">
          <Typography variant="body2">{task.description}</Typography>
        </DetailRow>

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

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <DetailRow label="Status">
            <Chip
              label={task.status.replace(/_/g, " ")}
              size="small"
              sx={getStatusChipSx(task.status)}
            />
          </DetailRow>

          <DetailRow label="Priority">
            <Chip
              label={task.priority}
              size="small"
              sx={getPriorityChipSx(task.priority)}
            />
          </DetailRow>

          <DetailRow label="Type">
            <Typography variant="body2">
              {task.type.replace(/_/g, " ")}
            </Typography>
          </DetailRow>

          <DetailRow label="Category">
            <Typography variant="body2">
              {task.category?.name ?? "—"}
            </Typography>
          </DetailRow>
        </Box>

        <Divider sx={{ borderColor: "grayscale.100", my: 2 }} />

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
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

        <Divider sx={{ borderColor: "grayscale.100", my: 2 }} />

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
              {task.createdBy?.name || task.createdBy?.email || "—"}
            </Typography>
          </DetailRow>
        </Box>

        <Divider sx={{ borderColor: "grayscale.100", my: 2 }} />

        <Typography variant="subtitle2" sx={{ color: "grayscale.500", mb: 1 }}>
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

        {task.files && task.files.length > 0 && (
          <>
            <Divider sx={{ borderColor: "grayscale.100", my: 2 }} />
            <Typography
              variant="subtitle2"
              sx={{ color: "grayscale.500", mb: 1 }}
            >
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
          </>
        )}
      </DialogContent>
      <DialogActions sx={tasksStyles.dialogActions}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailDialog;
