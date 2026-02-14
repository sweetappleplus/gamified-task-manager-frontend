import { SxProps, Theme } from "@mui/material";
import { TaskSubmission } from "types";

export interface SubmissionHistoryProps {
  /**
   * Array of task submissions displayed in chronological order as a timeline
   */
  submissions: TaskSubmission[];
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
