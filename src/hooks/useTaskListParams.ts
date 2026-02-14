import { useState, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const SEARCH_PARAM = "search";
const FILTER_PARAM = "filter";
const PAGE_PARAM = "page";

export const useTaskListParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get(SEARCH_PARAM) || "";
  const initialFilter = searchParams.get(FILTER_PARAM) || "all";
  const initialPage = Math.max(1, Number(searchParams.get(PAGE_PARAM)) || 1);

  const [search, setSearch] = useState(initialSearch);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [page, setPage] = useState(initialPage);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateUrl = useCallback(
    (newSearch: string, newFilter: string, newPage: number) => {
      const params = new URLSearchParams();

      if (newSearch.trim()) {
        params.set(SEARCH_PARAM, newSearch.trim());
      }
      if (newFilter && newFilter !== "all") {
        params.set(FILTER_PARAM, newFilter);
      }
      if (newPage > 1) {
        params.set(PAGE_PARAM, String(newPage));
      }

      setSearchParams(params, { replace: true });
    },
    [setSearchParams]
  );

  const handleSearchChange = useCallback(
    (
      value: string,
      currentFilter: string,
      onSearch: (searchTerm: string, filterId: string) => void
    ) => {
      setSearch(value);

      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        setPage(1);
        updateUrl(value, currentFilter, 1);
        onSearch(value, currentFilter);
      }, 400);
    },
    [updateUrl]
  );

  const handleFilterChange = useCallback(
    (filterId: string, currentSearch: string) => {
      const newFilter = activeFilter === filterId ? "all" : filterId;
      setActiveFilter(newFilter);
      setPage(1);
      updateUrl(currentSearch, newFilter, 1);
      return newFilter;
    },
    [activeFilter, updateUrl]
  );

  const handlePageChange = useCallback(
    (newPage: number, currentSearch: string, currentFilter: string) => {
      setPage(newPage);
      updateUrl(currentSearch, currentFilter, newPage);
    },
    [updateUrl]
  );

  return {
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    initialPage,
    searchTimeoutRef,
    handleSearchChange,
    handleFilterChange,
    handlePageChange,
  };
};
