import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTaskByIdApi } from "services";
import { Task, UserLevel } from "types";
import { PAYOUT_XP_RATE_KEY } from "consts";
import { getLeafVariant } from "utils";
import { useAppSelector } from "app/hooks";
import { useLevelConfig } from "features/level-config";
import { useSystemSetting } from "features/system-setting";
import { LeafVariant } from "components";
import { useCompleteTask } from "../components/CompleteTaskModal";

export const useTaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const { levelConfigs, fetchLevelConfigs } = useLevelConfig();
  const { settings, fetchSettings } = useSystemSetting();

  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const completeTask = useCompleteTask(id ?? "");

  useEffect(() => {
    fetchLevelConfigs();
    fetchSettings();
  }, [fetchLevelConfigs, fetchSettings]);

  const fetchTask = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getTaskByIdApi(id);
      if (response.data) {
        setTask(response.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleCompleteTask = useCallback(() => {
    completeTask.open();
  }, [completeTask]);

  const handleDownloadFiles = useCallback(() => {
    if (!task?.files?.length) return;
    task.files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.fileName;
      link.click();
    });
  }, [task?.files]);

  const payoutXpRate = useMemo(() => {
    const setting = settings.find((s) => s.key === PAYOUT_XP_RATE_KEY);
    return setting ? Number(setting.value) : 1;
  }, [settings]);

  const creatorTotalXp = useMemo(() => {
    if (!task?.createdBy?.earning) return 0;
    return Math.floor(parseFloat(task.createdBy.earning) * payoutXpRate);
  }, [task?.createdBy?.earning, payoutXpRate]);

  const assigneeLeafVariant: LeafVariant | undefined = useMemo(() => {
    if (levelConfigs.length === 0) return undefined;
    return getLeafVariant(creatorTotalXp, levelConfigs);
  }, [creatorTotalXp, levelConfigs]);

  const assigneeLeafText: string | undefined = useMemo(() => {
    if (levelConfigs.length === 0) return undefined;
    const sorted = [...levelConfigs].sort(
      (a, b) => b.xpRequired - a.xpRequired
    );
    const current = sorted.find((c) => creatorTotalXp >= c.xpRequired);
    return current?.name;
  }, [creatorTotalXp, levelConfigs]);

  const reward = useMemo(() => {
    if (!task) return 0;
    const budget = parseFloat(task.budget);
    const commission = parseFloat(task.commissionPercent);
    return budget * (1 - commission / 100);
  }, [task]);

  const balanceAfterCompletion = useMemo(() => {
    const currentBalance = user?.balance ? parseFloat(user.balance) : 0;
    return currentBalance + reward;
  }, [user?.balance, reward]);

  const userLevel: UserLevel | undefined = user?.level;

  return {
    task,
    isLoading,
    assigneeLeafVariant,
    assigneeLeafText,
    reward,
    balanceAfterCompletion,
    userLevel,
    completeTask,
    handleBack,
    handleCompleteTask,
    handleDownloadFiles,
  };
};
