import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AdminLayout } from "components";
import { useWorkersPage } from "./hooks";
import { workersStyles } from "./Workers.styles";
import { WorkerFilters, WorkerTable, ConfirmDialog } from "./components";

const Workers = () => {
  const location = useLocation();
  const {
    workers,
    total,
    isLoading,
    filters,
    isSubmitting,
    statusTarget,
    openStatusDialog,
    closeStatusDialog,
    handleToggleStatus,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  } = useWorkersPage();

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={workersStyles.header}>
          <Typography variant="h5" sx={workersStyles.title}>
            Worker Management
          </Typography>
        </Box>

        <WorkerFilters filters={filters} onFilterChange={handleFilterChange} />

        <WorkerTable
          workers={workers}
          total={total}
          page={filters.page ?? 1}
          rowsPerPage={filters.limit ?? 10}
          isLoading={isLoading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSortChange={handleSortChange}
          onToggleStatus={openStatusDialog}
        />

        <ConfirmDialog
          open={statusTarget !== null}
          title={
            statusTarget?.isActive ? "Deactivate Worker" : "Activate Worker"
          }
          message={
            statusTarget?.isActive
              ? `Are you sure you want to deactivate "${statusTarget?.name || statusTarget?.email}"? They will no longer be able to log in.`
              : `Are you sure you want to activate "${statusTarget?.name || statusTarget?.email}"?`
          }
          confirmLabel={statusTarget?.isActive ? "Deactivate" : "Activate"}
          confirmColor={statusTarget?.isActive ? "error" : "success"}
          isSubmitting={isSubmitting}
          onClose={closeStatusDialog}
          onConfirm={handleToggleStatus}
        />
      </Box>
    </AdminLayout>
  );
};

export default Workers;
