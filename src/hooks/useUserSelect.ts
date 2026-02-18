import { useState, useCallback, useEffect, useRef } from "react";
import { getUsersApi } from "services";
import { User, UserRole } from "types";

const PAGE_SIZE = 20;

type UseUserSelectParams = {
  role?: UserRole;
};

export const useUserSelect = (params?: UseUserSelectParams) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const pageRef = useRef(1);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchPage = useCallback(
    async (page: number, searchText: string, append: boolean) => {
      setIsLoading(true);
      try {
        const response = await getUsersApi({
          ...(params?.role ? { role: params.role } : {}),
          page,
          limit: PAGE_SIZE,
          search: searchText || undefined,
        });
        if (response.data) {
          setUsers((prev) =>
            append ? [...prev, ...response.data!] : response.data!
          );
          const total = response.pagination?.total ?? 0;
          setHasMore(page * PAGE_SIZE < total);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [params?.role]
  );

  useEffect(() => {
    pageRef.current = 1;
    fetchPage(1, "", false);
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    const nextPage = pageRef.current + 1;
    pageRef.current = nextPage;
    fetchPage(nextPage, search, true);
  }, [isLoading, hasMore, search, fetchPage]);

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearch(text);
      if (searchTimerRef.current) {
        clearTimeout(searchTimerRef.current);
      }
      searchTimerRef.current = setTimeout(() => {
        pageRef.current = 1;
        fetchPage(1, text, false);
      }, 300);
    },
    [fetchPage]
  );

  return {
    users,
    isLoading,
    hasMore,
    search,
    loadMore,
    setSearch: handleSearchChange,
  };
};
