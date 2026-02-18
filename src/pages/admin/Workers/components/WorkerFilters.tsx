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
import { FilterUsersParams } from "types";
import { workersStyles } from "../Workers.styles";

type WorkerFiltersProps = {
  filters: FilterUsersParams;
  onFilterChange: (filters: FilterUsersParams) => void;
};

const WorkerFilters = ({ filters, onFilterChange }: WorkerFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");

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

  const handleClear = () => {
    setSearchValue("");
    onFilterChange({
      page: 1,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  const hasActiveFilters = filters.isActive !== undefined || filters.search;

  return (
    <Box sx={workersStyles.filterBar}>
      <TextField
        size="small"
        label="Search name or email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={workersStyles.searchField}
      />

      <FormControl size="small" sx={workersStyles.filterSelect}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.isActive === undefined ? "" : String(filters.isActive)}
          label="Status"
          onChange={(e) => {
            const val = e.target.value;
            onFilterChange({
              ...filters,
              isActive: val === "" ? undefined : val === "true",
              page: 1,
            });
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
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

export default WorkerFilters;
