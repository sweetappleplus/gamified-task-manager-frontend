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
  AdminNotificationFilterParams,
  NOTIFICATION_TYPES,
  NotificationType,
  User,
} from "types";
import { useUserSelect } from "hooks";
import { UserSelectField } from "components";
import { notificationsStyles } from "../Notifications.styles";

type NotificationFiltersProps = {
  filters: AdminNotificationFilterParams;
  onFilterChange: (filters: AdminNotificationFilterParams) => void;
};

const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: "Task Assigned",
  [NOTIFICATION_TYPES.TASK_APPROVED]: "Task Approved",
  [NOTIFICATION_TYPES.TASK_REJECTED]: "Task Rejected",
  [NOTIFICATION_TYPES.TASK_CANCELLED]: "Task Cancelled",
  [NOTIFICATION_TYPES.PAYMENT_RECORDED]: "Payment Recorded",
  [NOTIFICATION_TYPES.WORKER_JOINED]: "Worker Joined",
  [NOTIFICATION_TYPES.TASK_SUBMITTED]: "Task Submitted",
};

const NotificationFilters = ({
  filters,
  onFilterChange,
}: NotificationFiltersProps) => {
  const [searchValue, setSearchValue] = useState(filters.search ?? "");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const userSelect = useUserSelect();

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
      setSelectedUser(null);
    }
  }, [filters.userId]);

  const handleClear = () => {
    setSearchValue("");
    setSelectedUser(null);
    onFilterChange({
      page: 1,
      limit: filters.limit,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    });
  };

  const hasActiveFilters =
    filters.type ||
    filters.isRead !== undefined ||
    filters.isDelivered !== undefined ||
    filters.userId ||
    filters.search ||
    filters.createdFrom ||
    filters.createdTo;

  return (
    <Box sx={notificationsStyles.filterBar}>
      <TextField
        size="small"
        label="Search title/message"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        sx={notificationsStyles.searchField}
      />

      <FormControl size="small" sx={notificationsStyles.filterSelect}>
        <InputLabel>Type</InputLabel>
        <Select
          value={filters.type ?? ""}
          label="Type"
          onChange={(e) =>
            onFilterChange({
              ...filters,
              type: (e.target.value as NotificationType) || undefined,
              page: 1,
            })
          }
        >
          <MenuItem value="">All</MenuItem>
          {Object.entries(NOTIFICATION_TYPE_LABELS).map(([value, label]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Read Status</InputLabel>
        <Select
          value={filters.isRead === undefined ? "" : String(filters.isRead)}
          label="Read Status"
          onChange={(e) => {
            const val = e.target.value;
            onFilterChange({
              ...filters,
              isRead: val === "" ? undefined : val === "true",
              page: 1,
            });
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="false">Unread</MenuItem>
          <MenuItem value="true">Read</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Delivered Status</InputLabel>
        <Select
          value={
            filters.isDelivered === undefined ? "" : String(filters.isDelivered)
          }
          label="Delivered Status"
          onChange={(e) => {
            const val = e.target.value;
            onFilterChange({
              ...filters,
              isDelivered: val === "" ? undefined : val === "true",
              page: 1,
            });
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="true">Delivered</MenuItem>
          <MenuItem value="false">Not Delivered</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ minWidth: 200 }}>
        <UserSelectField
          users={userSelect.users}
          isLoading={userSelect.isLoading}
          hasMore={userSelect.hasMore}
          onLoadMore={userSelect.loadMore}
          onSearch={userSelect.setSearch}
          value={selectedUser}
          onChange={(user) => {
            setSelectedUser(user);
            onFilterChange({
              ...filters,
              userId: user?.id || undefined,
              page: 1,
            });
          }}
          label="Recipient"
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

export default NotificationFilters;
