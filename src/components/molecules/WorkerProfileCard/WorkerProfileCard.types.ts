import { User } from "types";

export interface WorkerProfileCardProps {
  user: User;
  taskCompleted: number;
  totalEarnings: number;
  onEditClick?: () => void;
}
