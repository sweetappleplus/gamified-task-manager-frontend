import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { User, UserSortBy, UserSortOrder } from "types";
import { BACKEND_URL } from "consts";
import { workersStyles } from "../Workers.styles";
import { formatDateTime } from "utils";

type WorkerTableProps = {
  workers: User[];
  total: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
  sortBy?: UserSortBy;
  sortOrder?: UserSortOrder;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange: (sortBy: UserSortBy) => void;
  onToggleStatus: (worker: User) => void;
};

const WorkerTable = ({
  workers,
  total,
  page,
  rowsPerPage,
  isLoading,
  sortBy,
  sortOrder,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onToggleStatus,
}: WorkerTableProps) => {
  const totalPages = Math.ceil(total / rowsPerPage) || 1;
  const [pageInput, setPageInput] = useState(String(page));

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageInputSubmit = () => {
    const parsed = parseInt(pageInput, 10);
    if (parsed >= 1 && parsed <= totalPages && parsed !== page) {
      onPageChange(parsed);
    } else {
      setPageInput(String(page));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  if (isLoading) {
    return (
      <Box sx={workersStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (workers.length === 0) {
    return (
      <Box sx={workersStyles.emptyState}>
        <Typography variant="body1">No workers found</Typography>
      </Box>
    );
  }

  const renderSortableHeader = (field: UserSortBy, label: string) => (
    <TableCell
      sx={workersStyles.sortableHeadCell}
      sortDirection={sortBy === field ? sortOrder : false}
    >
      <TableSortLabel
        active={sortBy === field}
        direction={sortBy === field ? sortOrder : "asc"}
        onClick={() => onSortChange(field)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );

  const getAvatarUrl = (avatarUrl?: string | null) => {
    if (!avatarUrl) return undefined;
    if (avatarUrl.startsWith("http")) return avatarUrl;
    return `${BACKEND_URL}${avatarUrl}`;
  };

  return (
    <TableContainer sx={workersStyles.tableContainer}>
      <Table>
        <TableHead sx={workersStyles.tableHead}>
          <TableRow>
            <TableCell sx={workersStyles.tableHeadCell}>Avatar</TableCell>
            {renderSortableHeader("name", "Name")}
            {renderSortableHeader("email", "Email")}
            <TableCell sx={workersStyles.tableHeadCell}>Status</TableCell>
            {renderSortableHeader("earning", "Earnings")}
            {renderSortableHeader("balance", "Balance")}
            {renderSortableHeader("lastLoginAt", "Last Login")}
            {renderSortableHeader("createdAt", "Joined")}
            <TableCell sx={workersStyles.tableHeadCell} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => (
            <TableRow
              key={worker.id}
              hover
              sx={{ "&:hover": { bgcolor: "grayscale.50" } }}
            >
              <TableCell sx={workersStyles.tableCell}>
                <Avatar
                  src={getAvatarUrl(worker.avatarUrl)}
                  sx={{ width: 32, height: 32 }}
                >
                  {(worker.name?.[0] || worker.email[0]).toUpperCase()}
                </Avatar>
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                {worker.name || "—"}
              </TableCell>
              <TableCell sx={workersStyles.truncatedCell}>
                {worker.email}
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                <Chip
                  label={worker.isActive ? "Active" : "Inactive"}
                  size="small"
                  sx={{
                    bgcolor: worker.isActive
                      ? "additional.green.light"
                      : "additional.red.light",
                    color: worker.isActive
                      ? "additional.green.main"
                      : "additional.red.main",
                    fontWeight: 600,
                    border: "none",
                  }}
                />
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                ${worker.earning ?? "0"}
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                ${worker.balance ?? "0"}
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                {formatDateTime(worker.lastLoginAt)}
              </TableCell>
              <TableCell sx={workersStyles.tableCell}>
                {formatDateTime(worker.createdAt)}
              </TableCell>
              <TableCell sx={workersStyles.tableCell} align="right">
                <Tooltip title={worker.isActive ? "Deactivate" : "Activate"}>
                  <IconButton
                    size="small"
                    onClick={() => onToggleStatus(worker)}
                    sx={{
                      color: worker.isActive
                        ? "additional.red.main"
                        : "additional.green.main",
                    }}
                  >
                    {worker.isActive ? (
                      <BlockIcon fontSize="small" />
                    ) : (
                      <CheckCircleOutlineIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={workersStyles.paginationContainer}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, pl: 2 }}>
            <Typography variant="body2" sx={{ color: "grayscale.500" }}>
              Page
            </Typography>
            <TextField
              size="small"
              type="number"
              value={pageInput}
              onChange={handlePageInputChange}
              onBlur={handlePageInputSubmit}
              onKeyDown={handlePageInputKeyDown}
              inputProps={{ min: 1, max: totalPages }}
              sx={{ width: 64, "& input": { textAlign: "center", py: 0.5 } }}
            />
            <Typography variant="body2" sx={{ color: "grayscale.500" }}>
              of {totalPages}
            </Typography>
          </Box>
          <TablePagination
            component="div"
            count={total}
            page={page - 1}
            onPageChange={(_, newPage) => {
              onPageChange(newPage + 1);
              setPageInput(String(newPage + 1));
            }}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) =>
              onRowsPerPageChange(parseInt(e.target.value, 10))
            }
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Box>
      </Box>
    </TableContainer>
  );
};

export default WorkerTable;
