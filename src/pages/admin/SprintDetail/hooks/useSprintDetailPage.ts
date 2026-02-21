import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSprint } from "features/sprint";
import { useToast } from "hooks";
import { getErrorMessage } from "utils";
import {
  Task,
  UpdateSprintRequest,
  SprintUserProgress,
  TASK_STATUSES,
} from "types";
import { getTasksApi } from "services";

type DialogMode = "edit" | "addTasks" | null;

export const useSprintDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedSprint,
    isLoading,
    fetchSprintById,
    editSprint,
    addTasks,
    removeTask,
    activateSprint,
    completeSprint,
    fetchProgress,
    clearSelectedSprint,
  } = useSprint();
  const { showToast } = useToast();

  const [dialogMode, setDialogMode] = useState<DialogMode>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTasks, setAvailableTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [taskSearch, setTaskSearch] = useState("");
  const [progress, setProgress] = useState<SprintUserProgress[]>([]);

  useEffect(() => {
    if (id) {
      fetchSprintById(id).catch((error: unknown) => {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to load sprint"),
        });
      });
    }

    return () => {
      clearSelectedSprint();
    };
  }, [id, fetchSprintById, showToast, clearSelectedSprint]);

  useEffect(() => {
    if (
      id &&
      selectedSprint &&
      (selectedSprint.status === "ACTIVE" ||
        selectedSprint.status === "COMPLETED")
    ) {
      fetchProgress(id)
        .then((response) => {
          if (response.data) {
            setProgress(response.data);
          }
        })
        .catch((error: unknown) => {
          showToast({
            variant: "error",
            message: getErrorMessage(error, "Failed to load progress"),
          });
        });
    }
  }, [id, selectedSprint?.status, fetchProgress, showToast, selectedSprint]);

  const openEditDialog = useCallback(() => {
    setDialogMode("edit");
  }, []);

  const openAddTasksDialog = useCallback(async () => {
    setDialogMode("addTasks");
    setSelectedTaskIds([]);
    setTaskSearch("");
    setIsLoadingTasks(true);
    try {
      const response = await getTasksApi({
        statuses: [TASK_STATUSES.NEW, TASK_STATUSES.PENDING],
        limit: 100,
      });
      if (response.data) {
        const existingTaskIds = new Set(
          selectedSprint?.tasks?.map((st) => st.task.id) ?? []
        );
        setAvailableTasks(
          response.data.filter((task) => !existingTaskIds.has(task.id))
        );
      }
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to load available tasks"),
      });
    } finally {
      setIsLoadingTasks(false);
    }
  }, [selectedSprint, showToast]);

  const closeDialog = useCallback(() => {
    setDialogMode(null);
    setSelectedTaskIds([]);
    setTaskSearch("");
  }, []);

  const handleEdit = useCallback(
    async (data: UpdateSprintRequest) => {
      if (!id) return;
      setIsSubmitting(true);
      try {
        const response = await editSprint(id, data);
        showToast({ variant: "success", message: response.message });
        closeDialog();
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to update sprint"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, editSprint, showToast, closeDialog]
  );

  const handleAddTasks = useCallback(async () => {
    if (!id || selectedTaskIds.length === 0) return;
    setIsSubmitting(true);
    try {
      const response = await addTasks(id, { taskIds: selectedTaskIds });
      showToast({ variant: "success", message: response.message });
      closeDialog();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to add tasks"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [id, selectedTaskIds, addTasks, showToast, closeDialog]);

  const handleRemoveTask = useCallback(
    async (taskId: string) => {
      if (!id) return;
      setIsSubmitting(true);
      try {
        const response = await removeTask(id, taskId);
        showToast({ variant: "success", message: response.message });
        await fetchSprintById(id);
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Failed to remove task"),
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [id, removeTask, showToast, fetchSprintById]
  );

  const handleActivate = useCallback(async () => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const response = await activateSprint(id);
      showToast({ variant: "success", message: response.message });
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to activate sprint"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [id, activateSprint, showToast]);

  const handleComplete = useCallback(async () => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      const response = await completeSprint(id);
      showToast({ variant: "success", message: response.message });
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to complete sprint"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [id, completeSprint, showToast]);

  const toggleTaskSelection = useCallback((taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((tid) => tid !== taskId)
        : [...prev, taskId]
    );
  }, []);

  const goBack = useCallback(() => {
    navigate("/admin/sprints");
  }, [navigate]);

  const filteredAvailableTasks = availableTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
      task.description.toLowerCase().includes(taskSearch.toLowerCase())
  );

  const currentTaskCount = selectedSprint?.tasks?.length ?? 0;
  const maxTasksToAdd = 8 - currentTaskCount;
  const canAddMoreTasks =
    selectedSprint?.status === "DRAFT" && currentTaskCount < 8;
  const canRemoveTasks =
    selectedSprint?.status === "DRAFT" && currentTaskCount > 5;
  const canActivate =
    selectedSprint?.status === "DRAFT" &&
    currentTaskCount >= 5 &&
    currentTaskCount <= 8;
  const canComplete = selectedSprint?.status === "ACTIVE";

  return {
    sprint: selectedSprint,
    isLoading,
    isSubmitting,
    dialogMode,
    availableTasks: filteredAvailableTasks,
    isLoadingTasks,
    selectedTaskIds,
    taskSearch,
    progress,
    maxTasksToAdd,
    canAddMoreTasks,
    canRemoveTasks,
    canActivate,
    canComplete,
    openEditDialog,
    openAddTasksDialog,
    closeDialog,
    handleEdit,
    handleAddTasks,
    handleRemoveTask,
    handleActivate,
    handleComplete,
    toggleTaskSelection,
    setTaskSearch,
    goBack,
  };
};
