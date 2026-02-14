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
  Divider,
  Link,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import { Task } from "types";
import { BACKEND_URL } from "consts";
import { tasksStyles, getStatusChipSx } from "../Tasks.styles";
import { formatDateTime } from "utils";

if (!BACKEND_URL) {
  throw new Error("REACT_APP_API_URL is not defined");
}

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
  const submission = task?.latestSubmission;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
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
            {/* Task Info */}
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

            {/* Submission Section */}
            {submission && (
              <>
                <Divider sx={{ borderColor: "grayscale.100", my: 2 }} />
                <Box
                  sx={{
                    bgcolor: "grayscale.50",
                    borderRadius: 2,
                    p: 2,
                    mb: 2,
                    border: "1px solid",
                    borderColor: "grayscale.100",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "grayscale.900", fontWeight: 600, mb: 1.5 }}
                  >
                    Worker Submission
                  </Typography>

                  {/* Submission meta */}
                  <Box
                    sx={{ display: "flex", gap: 2, mb: 1.5, flexWrap: "wrap" }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "grayscale.500" }}
                    >
                      Submitted: {formatDateTime(submission.createdAt)}
                    </Typography>
                    {submission.isLate && (
                      <Chip
                        label="LATE"
                        size="small"
                        color="error"
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                    )}
                  </Box>

                  {/* Comment */}
                  <Box sx={{ mb: 1.5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: "grayscale.500",
                        fontSize: "0.75rem",
                        mb: 0.5,
                      }}
                    >
                      Comment
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "grayscale.800",
                        whiteSpace: "pre-wrap",
                        bgcolor: "grayscale.0",
                        p: 1.5,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "grayscale.100",
                      }}
                    >
                      {submission.comment}
                    </Typography>
                  </Box>

                  {/* Proof URLs */}
                  {submission.proofUrls && submission.proofUrls.length > 0 && (
                    <Box sx={{ mb: 1.5 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "grayscale.500",
                          fontSize: "0.75rem",
                          mb: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <LinkIcon sx={{ fontSize: 14 }} />
                        Proof Links ({submission.proofUrls.length})
                      </Typography>
                      {submission.proofUrls.map((url, i) => (
                        <Box key={i} sx={{ ml: 1, mb: 0.5 }}>
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "primary.main", fontSize: "0.875rem" }}
                          >
                            {url}
                          </Link>
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Submission Files */}
                  {submission.files && submission.files.length > 0 && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: "grayscale.500",
                          fontSize: "0.75rem",
                          mb: 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <AttachFileIcon sx={{ fontSize: 14 }} />
                        Attached Files ({submission.files.length})
                      </Typography>
                      {submission.files.map((file) => (
                        <Box key={file.id} sx={{ ml: 1, mb: 0.5 }}>
                          <Link
                            href={`${BACKEND_URL}${file.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: "primary.main", fontSize: "0.875rem" }}
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
                </Box>
              </>
            )}

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
