import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useAuth } from "features/auth";
import { useLevelConfig } from "features/level-config";
import { getActivityLogsApi } from "services";
import { ActivityLog } from "types";
import { formatDate, getLeafVariant } from "utils";

const INITIAL_LIMIT = 15;
const LOAD_MORE_LIMIT = 15;

export const useProfilePage = () => {
  const { user } = useAuth();
  const { levelConfigs, fetchLevelConfigs } = useLevelConfig();

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLoadingRef = useRef(false);

  const loadActivityLogs = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await getActivityLogsApi({
        page: 1,
        limit: INITIAL_LIMIT,
      });
      if (response.data) {
        setActivityLogs(response.data);
        pageRef.current = 1;
        if (response.pagination) {
          setHasMore(1 < response.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      }
    } catch {
      setHasMore(false);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;
    const nextPage = pageRef.current + 1;
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await getActivityLogsApi({
        page: nextPage,
        limit: LOAD_MORE_LIMIT,
      });
      if (response.data) {
        setActivityLogs((prev) => [...prev, ...response.data!]);
        pageRef.current = nextPage;
        if (response.pagination) {
          setHasMore(nextPage < response.pagination.totalPages);
        } else {
          setHasMore(false);
        }
      }
    } catch {
      setHasMore(false);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore]);

  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (!node) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(node);
    },
    [hasMore, loadMore]
  );

  useEffect(() => {
    loadActivityLogs();
  }, [loadActivityLogs]);

  useEffect(() => {
    fetchLevelConfigs();
  }, [fetchLevelConfigs]);

  const leafVariant = useMemo(
    () =>
      user?.level && levelConfigs.length > 0
        ? getLeafVariant(user.level.totalXp, levelConfigs)
        : undefined,
    [user?.level, levelConfigs]
  );
  const leafText = user?.level?.currentLevel.name;

  const taskCompleted = user?.completedTaskCount ?? 0;
  const totalEarnings = user?.earning ? parseFloat(user.earning) : 0;
  const joinedDate = user?.createdAt ? formatDate(user.createdAt) : "—";

  return {
    user,
    activityLogs,
    isLoading,
    hasMore,
    sentinelRef,
    taskCompleted,
    totalEarnings,
    joinedDate,
    leafVariant,
    leafText,
  };
};
