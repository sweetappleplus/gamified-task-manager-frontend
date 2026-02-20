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
  AdminLedgerFilterParams,
  LEDGER_TYPES,
  LedgerType,
  User,
  USER_ROLES,
} from "types";
import { useUserSelect } from "hooks";
import { UserSelectField } from "components";
import { financeStyles } from "../Finance.styles";

type LedgerFiltersProps = {
  filters: AdminLedgerFilterParams;
  onFilterChange: (filters: AdminLedgerFilterParams) => void;
};

const LEDGER_TYPE_LABELS: Record<LedgerType, string> = {
  [LEDGER_TYPES.TASK_REWARD]: "Task Reward",
  [LEDGER_TYPES.BONUS]: "Bonus",
  [LEDGER_TYPES.ADJUSTMENT]: "Adjustment",
  [LEDGER_TYPES.WITHDRAWAL]: "Withdrawal",
};

const LedgerFilters = ({ filters, onFilterChange }: LedgerFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [selectedWorker, setSelectedWorker] = useState<User | null>(null);
  const userSelect = useUserSelect({ role: USER_ROLES.WORKER });

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
    if (!filters.userId) {
      setSelectedWorker(null);
    }
  }, [filters.userId]);

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
    filters.type ||
    filters.isPaid !== undefined ||
    filters.userId ||
    filters.search ||
    filters.createdFrom ||
    filters.createdTo;

  return (
    <Box sx={financeStyles.filterBar}>
      <TextField
        size="small"
        label="Search description/task"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={financeStyles.searchField}
      />

      <FormControl size="small" sx={financeStyles.filterSelect}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type ?? ""}
          label="Type"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              type: (e.target.value as LedgerType) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {Object.entries(LEDGER_TYPE_LABELS).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Payment Status</InputLabel>
        <Select
          value={filters.isPaid === undefined ? "" : String(filters.isPaid)}
          label="Payment Status"
          onChange={(e) => {
            const val = e.target.value;
            onFilterChange({
              ...filters,
              isPaid: val === "" ? undefined : val === "true" ? true : false,
              page: 1,
            });
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="false">Not Paid</MenuItem>
          <MenuItem value="true">Paid</MenuItem>
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
              userId: worker?.id || undefined,
              page: 1,
            });
          }}
          label="Worker"
        />
      </Box>

      <TextField
        size="small"
        label="From Date"
        type="date"
        value={filters.createdFrom ? filters.createdFrom.substring(0, 10) : ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            createdFrom: e.target.value
              ? `${e.target.value}T00:00:00Z`
              : undefined,
            page: 1,
          })
        }
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        size="small"
        label="To Date"
        type="date"
        value={filters.createdTo ? filters.createdTo.substring(0, 10) : ""}
        onChange={(e) =>
          onFilterChange({
            ...filters,
            createdTo: e.target.value
              ? `${e.target.value}T23:59:59Z`
              : undefined,
            page: 1,
          })
        }
        InputLabelProps={{ shrink: true }}
      />

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

export default LedgerFilters;
