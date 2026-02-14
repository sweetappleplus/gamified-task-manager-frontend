import React from "react";
import { Box, styled } from "@mui/material";
import { Icon } from "components";
import { TaskSubmission } from "types";
import { BACKEND_URL } from "consts";
import { formatDateTime } from "utils";
import { SubmissionHistoryProps } from "./SubmissionHistory.types";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const Title = styled(Box)(({ theme }) => ({
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
  marginBottom: 12,
}));

const EntryWrapper = styled(Box)({
  position: "relative",
  paddingLeft: 24,
});

const TimelineDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isLatest",
})<{ isLatest?: boolean }>(({ theme, isLatest }) => ({
  position: "absolute",
  left: 0,
  top: 6,
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: isLatest
    ? theme.palette.primary.main
    : theme.palette.grayscale[300],
  border: "2px solid",
  borderColor: isLatest
    ? theme.palette.primary.light
    : theme.palette.grayscale[200],
}));

const TimelineLine = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 5,
  top: 18,
  bottom: -16,
  width: 2,
  backgroundColor: theme.palette.grayscale[100],
}));

const EntryHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 8,
  flexWrap: "wrap",
});

const EntryLabel = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 600,
  color: theme.palette.grayscale[950],
}));

const EntryDate = styled(Box)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 400,
  color: theme.palette.grayscale[500],
}));

const LateBadge = styled(Box)(({ theme }) => ({
  fontSize: 11,
  lineHeight: "14px",
  fontWeight: 600,
  color: theme.palette.error.main,
  backgroundColor: theme.palette.error.light,
  padding: "2px 8px",
  borderRadius: 32,
}));

const CommentBox = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.grayscale[700],
  whiteSpace: "pre-wrap" as const,
  padding: 12,
  borderRadius: 12,
  border: "1px solid",
  borderColor: theme.palette.grayscale[50],
  backgroundColor: theme.palette.grayscale[0],
  marginBottom: 8,
}));

const LinkRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 4,
});

const LinkText = styled("a")(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 400,
  color: theme.palette.primary.main,
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

const SectionLabel = styled(Box)(({ theme }) => ({
  fontSize: 13,
  lineHeight: "16px",
  fontWeight: 500,
  color: theme.palette.grayscale[500],
  marginBottom: 6,
  display: "flex",
  alignItems: "center",
  gap: 4,
}));

const FeedbackBox = styled(Box)(({ theme }) => ({
  fontSize: 14,
  lineHeight: "20px",
  fontWeight: 400,
  color: theme.palette.warning.dark,
  whiteSpace: "pre-wrap" as const,
  padding: 12,
  borderRadius: 12,
  border: "1px solid",
  borderColor: theme.palette.warning.main,
  backgroundColor: theme.palette.warning.light,
  marginBottom: 8,
}));

const FeedbackDate = styled("span")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.palette.grayscale[400],
  marginLeft: 4,
}));

const Divider = styled(Box)(({ theme }) => ({
  height: 1,
  backgroundColor: theme.palette.grayscale[50],
  marginTop: 12,
  marginBottom: 12,
}));

const SubmissionEntry = ({
  submission,
  index,
  total,
}: {
  submission: TaskSubmission;
  index: number;
  total: number;
}) => {
  const isLatest = index === total - 1;
  const label = total === 1 ? "Submission" : `Submission #${index + 1}`;

  return (
    <EntryWrapper sx={{ pb: isLatest ? 0 : 2 }}>
      {!isLatest && <TimelineLine />}
      <TimelineDot isLatest={isLatest} />

      <EntryHeader>
        <EntryLabel>{label}</EntryLabel>
        <EntryDate>{formatDateTime(submission.createdAt)}</EntryDate>
        {submission.isLate && <LateBadge>LATE</LateBadge>}
      </EntryHeader>

      <CommentBox>{submission.comment}</CommentBox>

      {submission.proofUrls && submission.proofUrls.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <SectionLabel>Proof Links</SectionLabel>
          {submission.proofUrls.map((url, i) => (
            <LinkRow key={i}>
              <Icon name="link" size={14} color="grayscale.400" />
              <LinkText href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </LinkText>
            </LinkRow>
          ))}
        </Box>
      )}

      {submission.files && submission.files.length > 0 && (
        <Box sx={{ mb: 1 }}>
          <SectionLabel>Files</SectionLabel>
          {submission.files.map((file) => (
            <LinkRow key={file.id}>
              <Icon name="document-text" size={14} color="grayscale.400" />
              <LinkText
                href={`${BACKEND_URL}${file.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.fileName}
              </LinkText>
            </LinkRow>
          ))}
        </Box>
      )}

      {submission.adminFeedback && (
        <Box sx={{ mb: 1 }}>
          <SectionLabel>
            Admin Feedback
            {submission.reviewedAt && (
              <FeedbackDate>
                ({formatDateTime(submission.reviewedAt)})
              </FeedbackDate>
            )}
          </SectionLabel>
          <FeedbackBox>{submission.adminFeedback}</FeedbackBox>
        </Box>
      )}

      {!isLatest && <Divider />}
    </EntryWrapper>
  );
};

export const SubmissionHistory: React.FC<SubmissionHistoryProps> = ({
  submissions,
  sx,
}) => {
  if (submissions.length === 0) return null;

  return (
    <Wrapper sx={sx}>
      <Title>Submission History</Title>
      {submissions.map((submission, i) => (
        <SubmissionEntry
          key={submission.id}
          submission={submission}
          index={i}
          total={submissions.length}
        />
      ))}
    </Wrapper>
  );
};
