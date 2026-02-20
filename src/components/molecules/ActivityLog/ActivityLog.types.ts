import { IconName } from "components";
import { ActivityType } from "types";

export interface ActivityLogConfig {
  icon: IconName;
  iconColor: string;
  bgColor: string;
}

export interface ActivityLogProps {
  type: ActivityType;
  message: string;
  date: string;
}
