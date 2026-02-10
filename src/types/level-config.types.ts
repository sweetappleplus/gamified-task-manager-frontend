import { TaskType } from "./task.types";

export type LevelConfig = {
  id: string;
  name: string;
  xpRequired: number;
  earningMultiplier: string;
  unlockedTaskTypes: TaskType[];
  createdAt: string;
  updatedAt: string;
};

export type CreateLevelConfigRequest = {
  name: string;
  xpRequired: number;
  earningMultiplier: string;
  unlockedTaskTypes: TaskType[];
};

export type UpdateLevelConfigRequest = {
  name?: string;
  xpRequired?: number;
  earningMultiplier?: string;
  unlockedTaskTypes?: TaskType[];
};
