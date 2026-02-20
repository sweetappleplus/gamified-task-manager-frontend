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
  Checkbox,
  Link as MuiLink,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { Link as RouterLink } from "react-router-dom";
import {
  LedgerEntry,
  LedgerSortBy,
  LedgerSortOrder,
  LEDGER_TYPES,
} from "types";
import { ROUTES } from "consts";
import {
  financeStyles,
  getLedgerTypeChipSx,
  getPaidChipSx,
} from "../Finance.styles";
import { formatDateTime } from "utils";

type LedgerTableProps = {
  entries: LedgerEntry[];
  total: number;
  page: number;
  rowsPerPage: number;
  isLoading: boolean;
  isSubmitting: boolean;
  sortBy?: LedgerSortBy;
  sortOrder?: LedgerSortOrder;
  selectedIds: string[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onSortChange: (sortBy: LedgerSortBy) => void;
  onMarkAsPaid: (id: string) => void;
  onMarkAsUnpaid: (id: string) => void;
  onSelectEntry: (id: string) => void;
  onSelectAll: (checked: boolean) => void;
};

const LEDGER_TYPE_LABELS: Record<string, string> = {
  [LEDGER_TYPES.TASK_REWARD]: "Task Reward",
  [LEDGER_TYPES.BONUS]: "Bonus",
  [LEDGER_TYPES.ADJUSTMENT]: "Adjustment",
  [LEDGER_TYPES.WITHDRAWAL]: "Withdrawal",
};

const LedgerTable = ({
  entries,
  total,
  page,
  rowsPerPage,
  isLoading,
  isSubmitting,
  sortBy,
  sortOrder,
  selectedIds,
  onPageChange,
  onRowsPerPageChange,
  onSortChange,
  onMarkAsPaid,
  onMarkAsUnpaid,
  onSelectEntry,
  onSelectAll,
}: LedgerTableProps) => {
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
      <Box sx={financeStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (entries.length === 0) {
    return (
      <Box sx={financeStyles.emptyState}>
        <Typography variant="body1">No ledger entries found</Typography>
      </Box>
    );
  }

  const unpaidEntries = entries.filter((e) => !e.isPaid);
  const allUnpaidSelected =
    unpaidEntries.length > 0 &&
    unpaidEntries.every((e) => selectedIds.includes(e.id));

  return (
    <Box sx={financeStyles.tableContainer}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={financeStyles.tableHead}>
              <TableCell sx={financeStyles.tableHeadCell} padding="checkbox">
                <Checkbox
                  size="small"
                  checked={allUnpaidSelected}
                  indeterminate={selectedIds.length > 0 && !allUnpaidSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  disabled={unpaidEntries.length === 0}
                />
              </TableCell>
              <TableCell
                sx={financeStyles.sortableHeadCell}
                sortDirection={
                  sortBy === "createdAt" ? (sortOrder as "asc" | "desc") : false
                }
              >
                <TableSortLabel
                  active={sortBy === "createdAt"}
                  direction={
                    sortBy === "createdAt"
                      ? (sortOrder as "asc" | "desc")
                      : "asc"
                  }
                  onClick={() => onSortChange("createdAt")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>Worker</TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>Type</TableCell>
              <TableCell
                sx={financeStyles.sortableHeadCell}
                sortDirection={
                  sortBy === "amount" ? (sortOrder as "asc" | "desc") : false
                }
              >
                <TableSortLabel
                  active={sortBy === "amount"}
                  direction={
                    sortBy === "amount" ? (sortOrder as "asc" | "desc") : "asc"
                  }
                  onClick={() => onSortChange("amount")}
                >
                  Amount
                </TableSortLabel>
              </TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>
                Description
              </TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>
                Related Task
              </TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>Status</TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>Paid At</TableCell>
              <TableCell sx={financeStyles.tableHeadCell}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id} hover>
                <TableCell sx={financeStyles.tableCell} padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={selectedIds.includes(entry.id)}
                    onChange={() => onSelectEntry(entry.id)}
                    disabled={entry.isPaid}
                  />
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  {formatDateTime(entry.createdAt)}
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  {entry.user?.name || entry.user?.email || "-"}
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  <Chip
                    label={LEDGER_TYPE_LABELS[entry.type] ?? entry.type}
                    size="small"
                    variant="outlined"
                    sx={getLedgerTypeChipSx(entry.type)}
                  />
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color:
                        entry.type === LEDGER_TYPES.WITHDRAWAL
                          ? "additional.red.main"
                          : "additional.green.main",
                    }}
                  >
                    {entry.type === LEDGER_TYPES.WITHDRAWAL ? "-" : "+"}$
                    {Number(entry.amount).toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell sx={financeStyles.truncatedCell}>
                  {entry.description || "-"}
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  {entry.relatedTask ? (
                    <MuiLink
                      component={RouterLink}
                      to={ROUTES.ADMIN_TASK_DETAIL.path.replace(
                        ":id",
                        entry.relatedTask.id
                      )}
                      underline="hover"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      {entry.relatedTask.title}
                    </MuiLink>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  <Chip
                    label={entry.isPaid ? "Paid" : "Not Paid"}
                    size="small"
                    variant="outlined"
                    sx={getPaidChipSx(entry.isPaid)}
                  />
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  {entry.paidAt ? formatDateTime(entry.paidAt) : "-"}
                </TableCell>
                <TableCell sx={financeStyles.tableCell}>
                  {entry.isPaid ? (
                    <Tooltip title="Mark as Unpaid">
                      <IconButton
                        size="small"
                        onClick={() => onMarkAsUnpaid(entry.id)}
                        disabled={isSubmitting}
                        sx={{ color: "additional.orange.main" }}
                      >
                        <UndoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Mark as Paid">
                      <IconButton
                        size="small"
                        onClick={() => onMarkAsPaid(entry.id)}
                        disabled={isSubmitting}
                        sx={{ color: "additional.green.main" }}
                      >
                        <CheckCircleIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          ...financeStyles.paginationContainer,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ color: "grayscale.500" }}>
            Page
          </Typography>
          <TextField
            size="small"
            value={pageInput}
            onChange={handlePageInputChange}
            onBlur={handlePageInputSubmit}
            onKeyDown={handlePageInputKeyDown}
            sx={{ width: 60 }}
            inputProps={{
              style: { textAlign: "center", padding: "4px 8px" },
            }}
          />
          <Typography variant="body2" sx={{ color: "grayscale.500" }}>
            of {totalPages}
          </Typography>
        </Box>
        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          rowsPerPage={rowsPerPage}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Box>
    </Box>
  );
};

export default LedgerTable;
