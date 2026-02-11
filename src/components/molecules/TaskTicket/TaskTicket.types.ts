import { Task } from "types";

export interface TaskTicketProps {
  /**
   * The task to display
   */
  task: Task;
  /**
   * Callback when the ticket is clicked
   */
  onClick?: (taskId: string) => void;
  /**
   * Callback when the "Start Now" button is clicked
   */
  onStart?: (taskId: string) => void;
}
