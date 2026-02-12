import { SxProps, Theme } from "@mui/material";
import { LeafVariant } from "components";
import { Task } from "types";

export interface TaskDescriptionProps {
  /**
   * The task to display
   */
  task: Task;
  /**
   * Leaf variant for the assigned user
   */
  assigneeLeafVariant?: LeafVariant;
  /**
   * Leaf text for the assigned user
   */
  assigneeLeafText?: string;
  /**
   * Callback when attachments tag is clicked (triggers file download)
   */
  onAttachmentsClick?: () => void;
  /**
   * MUI sx prop for custom styling
   */
  sx?: SxProps<Theme>;
}
