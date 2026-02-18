import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  TaskFilterParams,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_TYPES,
  TaskCategory,
  TaskStatus,
  TaskPriority,
  TaskType,
  User,
  USER_ROLES,
} from "types";
import { useUserSelect } from "hooks";
import { UserSelectField } from "components";
import { tasksStyles } from "../Tasks.styles";

type TaskFiltersProps = {
  filters: TaskFilterParams;
  categories: TaskCategory[];
  onFilterChange: (filters: TaskFilterParams) => void;
};

const TaskFilters = ({
  filters,
  categories,
  onFilterChange,
}: TaskFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [selectedWorker, setSelectedWorker] = useState<User | null>(null);
  const userSelect = useUserSelect({ role: USER_ROLES.WORKER });

  // Sync search input when filters change externally (e.g., URL init)
  useEffect(() => {
    setSearchValue(filters.search ?? "");
  }, [filters.search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== (filters.search ?? "")) {
        onFilterChange({
          ...filters,
          search: searchValue || undefined,
          page: 1,
        });
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchValue, filters, onFilterChange]);

  useEffect(() => {
    if (!filters.assignedUserId) {
      setSelectedWorker(null);
    }
  }, [filters.assignedUserId]);

  const handleClear = () => {
    setSearchValue("");
    setSelectedWorker(null);
    onFilterChange({
      page: 1,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  const hasActiveFilters =
    filters.status ||
    filters.priority ||
    filters.type ||
    filters.categoryId ||
    filters.assignedUserId ||
    filters.search;

  return (
    <Box sx={tasksStyles.filterBar}>
      <TextField
        size="small"
        label="Search title"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={tasksStyles.searchField}
      />

      <FormControl size="small" sx={tasksStyles.filterSelect}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status ?? ""}
          label="Status"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: (e.target.value as TaskStatus) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {Object.values(TASK_STATUSES).map((s) => (
            <MenuItem key={s} value={s}>
              {s.replace(/_/g, " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={tasksStyles.filterSelect}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={filters.priority ?? ""}
          label="Priority"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              priority: (e.target.value as TaskPriority) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {Object.values(TASK_PRIORITIES).map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={tasksStyles.filterSelect}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type ?? ""}
          label="Type"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              type: (e.target.value as TaskType) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {Object.values(TASK_TYPES).map((t) => (
            <MenuItem key={t} value={t}>
              {t.replace(/_/g, " ")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={tasksStyles.filterSelect}>
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.categoryId ?? ""}
          label="Category"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              categoryId: (e.target.value as string) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 200 }}>
        <UserSelectField
          users={userSelect.users}
          isLoading={userSelect.isLoading}
          hasMore={userSelect.hasMore}
          onLoadMore={userSelect.loadMore}
          onSearch={userSelect.setSearch}
          value={selectedWorker}
          onChange={(worker) => {
            setSelectedWorker(worker);
            onFilterChange({
              ...filters,
              assignedUserId: worker?.id || undefined,
              page: 1,
            });
          }}
          label="Assigned To"
        />
      </Box>

      {hasActiveFilters && (
        <Button
          size="small"
          startIcon={<ClearIcon />}
          onClick={handleClear}
          sx={{ color: "grayscale.400" }}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};

export default TaskFilters;
