import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task } from "types";
import { tasksStyles, getStatusChipSx } from "../Tasks.styles";

type ReviewTaskDialogProps = {
  open: boolean;
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onReview: (isApproved: boolean, feedback: string) => void;
};

const ReviewTaskDialog = ({
  open,
  task,
  isSubmitting,
  onClose,
  onReview,
}: ReviewTaskDialogProps) => {
  const [feedback, setFeedback] = useState("");

  const handleClose = () => {
    setFeedback("");
    onClose();
  };

  const handleApprove = () => {
    onReview(true, feedback);
    setFeedback("");
  };

  const handleReject = () => {
    onReview(false, feedback);
    setFeedback("");
  };

  const canReject = feedback.trim().length > 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={tasksStyles.dialogTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Review Task
          <IconButton onClick={handleClose} sx={{ color: "grayscale.500" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={tasksStyles.dialogContent}>
        {task && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: "grayscale.900", fontWeight: 600 }}
              >
                {task.title}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip
                  label={task.status.replace(/_/g, " ")}
                  size="small"
                  sx={getStatusChipSx(task.status)}
                />
                {task.assignedTo && (
                  <Typography variant="body2" sx={{ color: "grayscale.500" }}>
                    by {task.assignedTo.name || task.assignedTo.email}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "grayscale.500", mb: 0.5 }}
              >
                Description
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "grayscale.700", ml: 1, mb: 1 }}
              >
                {task.description}
              </Typography>
              {task.steps.length > 0 && (
                <>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "grayscale.500", mb: 0.5 }}
                  >
                    Steps
                  </Typography>
                  {task.steps.map((step, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{ color: "grayscale.700", ml: 1 }}
                    >
                      {i + 1}. {step}
                    </Typography>
                  ))}
                </>
              )}
            </Box>

            <TextField
              label="Feedback"
              fullWidth
              multiline
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Required for rejection, optional for approval"
              sx={{ ...tasksStyles.textField, mt: 1 }}
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ ...tasksStyles.dialogActions, gap: 1 }}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleReject}
          variant="contained"
          color="error"
          disabled={!canReject || isSubmitting}
        >
          {isSubmitting ? "..." : "Reject"}
        </Button>
        <Button
          onClick={handleApprove}
          variant="contained"
          color="success"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Approve"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewTaskDialog;
