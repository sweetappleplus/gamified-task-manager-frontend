import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "features/auth";
import { useTask } from "features/task";
import { useTaskCategory } from "features/task-category";
import {
  TASK_STATUSES,
  TASK_PRIORITIES,
  TaskStatus,
  TaskPriority,
  TaskFilterParams,
} from "types";

const INITIAL_LIMIT = 15;
const LOAD_MORE_LIMIT = 15;
const WORKER_STATUSES: TaskStatus[] = [
  TASK_STATUSES.PENDING,
  TASK_STATUSES.IN_ACTION,
  TASK_STATUSES.FAILED,
];

type FilterTag = {
  id: string;
  text: string;
  indicator?: string;
  type: "all" | "status" | "priority" | "category";
  value?: string;
};

export const useTasksPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, total, isLoading, fetchTasks, fetchMoreTasks, startTask } =
    useTask();
  const { categories, fetchCategories } = useTaskCategory();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isStarting, setIsStarting] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filterTags = useMemo((): FilterTag[] => {
    const tags: FilterTag[] = [
      { id: "all", text: "All", type: "all" },
      {
        id: "status_in_action",
        text: "In Progress",
        indicator: "primary.main",
        type: "status",
        value: TASK_STATUSES.IN_ACTION,
      },
      {
        id: "priority_high",
        text: "High Priority",
        indicator: "additional.red.main",
        type: "priority",
        value: TASK_PRIORITIES.HIGH,
      },
    ];

    categories.forEach((cat) => {
      tags.push({
        id: `category_${cat.id}`,
        text: cat.name,
        indicator: "grayscale.400",
        type: "category",
        value: cat.id,
      });
    });

    return tags;
  }, [categories]);

  const buildParams = useCallback(
    (
      pageNum: number,
      searchTerm: string,
      filterId: string
    ): TaskFilterParams => {
      const params: TaskFilterParams = {
        page: pageNum,
        limit: pageNum === 1 ? INITIAL_LIMIT : LOAD_MORE_LIMIT,
        statuses: WORKER_STATUSES,
        assignedUserId: user?.id,
      };

      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      const tag = filterTags.find((t) => t.id === filterId);
      if (tag) {
        if (tag.type === "status" && tag.value) {
          params.statuses = [tag.value as TaskStatus];
        } else if (tag.type === "priority" && tag.value) {
          params.priority = tag.value as TaskPriority;
        } else if (tag.type === "category" && tag.value) {
          params.categoryId = tag.value;
        }
      }

      return params;
    },
    [filterTags, user?.id]
  );

  const loadInitial = useCallback(
    async (searchTerm: string, filterId: string) => {
      setPage(1);
      setHasMore(true);
      try {
        const params = buildParams(1, searchTerm, filterId);
        const response = await fetchTasks(params);
        if (response?.pagination) {
          setHasMore(response.pagination.page < response.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      } catch {
        setHasMore(false);
      }
    },
    [buildParams, fetchTasks]
  );

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    try {
      const params = buildParams(nextPage, search, activeFilter);
      const response = await fetchMoreTasks(params);
      if (response?.pagination) {
        setPage(nextPage);
        setHasMore(nextPage < response.pagination.totalPages);
      } else {
        setHasMore(false);
      }
    } catch {
      setHasMore(false);
    }
  }, [
    isLoading,
    hasMore,
    page,
    buildParams,
    search,
    activeFilter,
    fetchMoreTasks,
  ]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoading) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasMore, isLoading, loadMore]
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    loadInitial(search, activeFilter);
  }, [activeFilter, loadInitial, search]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setSearch(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        loadInitial(value, activeFilter);
      }, 400);
    },
    [activeFilter, loadInitial]
  );

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter((prev) => (prev === filterId ? "all" : filterId));
  }, []);

  const handleTicketClick = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== TASK_STATUSES.PENDING) {
        navigate(`/tasks/${taskId}`);
      }
    },
    [tasks, navigate]
  );

  const handleStartTask = useCallback(
    async (taskId: string) => {
      setIsStarting(taskId);
      try {
        await startTask(taskId);
        navigate(`/tasks/${taskId}`);
      } finally {
        setIsStarting(null);
      }
    },
    [startTask, navigate]
  );

  return {
    tasks,
    total,
    isLoading,
    search,
    activeFilter,
    filterTags,
    hasMore,
    isStarting,
    sentinelRef,
    handleSearchChange,
    handleFilterChange,
    handleTicketClick,
    handleStartTask,
  };
};
