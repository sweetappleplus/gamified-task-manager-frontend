import { Box, Typography, Chip, Link, Divider } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinkIcon from "@mui/icons-material/Link";
import { TaskSubmission } from "types";
import { BACKEND_URL } from "consts";
import { formatDateTime } from "utils";

if (!BACKEND_URL) {
  throw new Error("REACT_APP_API_URL is not defined");
}

type SubmissionHistoryProps = {
  submissions: TaskSubmission[];
  compact?: boolean;
};

const SubmissionEntry = ({
  submission,
  index,
  total,
  compact,
}: {
  submission: TaskSubmission;
  index: number;
  total: number;
  compact?: boolean;
}) => {
  const isLatest = index === total - 1;
  const label = total === 1 ? "Submission" : `Submission #${index + 1}`;

  return (
    <Box sx={{ position: "relative", pl: 3, pb: isLatest ? 0 : 3 }}>
      {/* Timeline line */}
      {!isLatest && (
        <Box
          sx={{
            position: "absolute",
            left: 7,
            top: 12,
            bottom: 0,
            width: 2,
            bgcolor: "grayscale.200",
          }}
        />
      )}

      {/* Timeline dot */}
      <Box
        sx={{
          position: "absolute",
          left: 2,
          top: 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: isLatest ? "primary.main" : "grayscale.300",
          border: "2px solid",
          borderColor: isLatest ? "primary.light" : "grayscale.200",
        }}
      />

      {/* Submission header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "grayscale.900", fontWeight: 600 }}
        >
          {label}
        </Typography>
        <Typography variant="caption" sx={{ color: "grayscale.500" }}>
          {formatDateTime(submission.createdAt)}
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
          variant="body2"
          sx={{
            color: "grayscale.800",
            whiteSpace: "pre-wrap",
            bgcolor: "grayscale.0",
            p: compact ? 1 : 1.5,
            borderRadius: 1,
            border: "1px solid",
            borderColor: "grayscale.100",
            fontSize: compact ? "0.8125rem" : undefined,
          }}
        >
          {submission.comment}
        </Typography>
      </Box>

      {/* Proof URLs */}
      {submission.proofUrls && submission.proofUrls.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: "grayscale.500",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 0.5,
            }}
          >
            <LinkIcon sx={{ fontSize: 14 }} />
            Proof Links ({submission.proofUrls.length})
          </Typography>
          {submission.proofUrls.map((url, i) => (
            <Box key={i} sx={{ ml: 1, mb: 0.25 }}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.main", fontSize: "0.8125rem" }}
              >
                {url}
              </Link>
            </Box>
          ))}
        </Box>
      )}

      {/* Files */}
      {submission.files && submission.files.length > 0 && (
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: "grayscale.500",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              mb: 0.5,
            }}
          >
            <AttachFileIcon sx={{ fontSize: 14 }} />
            Files ({submission.files.length})
          </Typography>
          {submission.files.map((file) => (
            <Box key={file.id} sx={{ ml: 1, mb: 0.25 }}>
              <Link
                href={`${BACKEND_URL}${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "primary.main", fontSize: "0.8125rem" }}
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

      {/* Admin Feedback */}
      {submission.adminFeedback && (
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "grayscale.500", mb: 0.5, display: "block" }}
          >
            Admin Feedback
            {submission.reviewedAt && (
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "grayscale.400", ml: 1 }}
              >
                ({formatDateTime(submission.reviewedAt)})
              </Typography>
            )}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              bgcolor: "warning.50",
              p: compact ? 1 : 1.5,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "warning.200",
              color: "warning.900",
              fontSize: compact ? "0.8125rem" : undefined,
            }}
          >
            {submission.adminFeedback}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const SubmissionHistory = ({
  submissions,
  compact = false,
}: SubmissionHistoryProps) => {
  if (submissions.length === 0) return null;

  return (
    <Box>
      {!compact && <Divider sx={{ borderColor: "grayscale.100", mb: 2 }} />}
      <Typography
        variant="subtitle2"
        sx={{
          color: compact ? "grayscale.900" : "grayscale.500",
          fontWeight: 600,
          mb: 2,
        }}
      >
        Submission History ({submissions.length})
      </Typography>
      {submissions.map((submission, i) => (
        <SubmissionEntry
          key={submission.id}
          submission={submission}
          index={i}
          total={submissions.length}
          compact={compact}
        />
      ))}
    </Box>
  );
};

export default SubmissionHistory;
