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
} from "types";
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

  const handleClear = () => {
    setSearchValue("");
    onFilterChange({ page: 1, limit: filters.limit });
  };

  const hasActiveFilters =
    filters.status ||
    filters.priority ||
    filters.type ||
    filters.categoryId ||
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
