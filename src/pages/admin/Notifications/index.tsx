import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { AdminLayout } from "components";
import { useNotificationsPage } from "./hooks";
import { notificationsStyles } from "./Notifications.styles";
import {
  NotificationFilters,
  NotificationTable,
  SendNotificationDialog,
} from "./components";

const Notifications = () => {
  const location = useLocation();
  const {
    notifications,
    total,
    isLoading,
    filters,
    isSubmitting,
    selectedIds,
    isSendDialogOpen,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    handleDelete,
    handleBulkDelete,
    handleSend,
    handleSelectEntry,
    handleSelectAll,
    setIsSendDialogOpen,
  } = useNotificationsPage();

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={notificationsStyles.header}>
          <Typography variant="h5" sx={notificationsStyles.title}>
            Notifications
          </Typography>
          <Box sx={notificationsStyles.headerActions}>
            {selectedIds.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleBulkDelete}
                disabled={isSubmitting}
              >
                Delete {selectedIds.length}
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<SendIcon />}
              onClick={() => setIsSendDialogOpen(true)}
            >
              Send Notification
            </Button>
          </Box>
        </Box>

        <NotificationFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <NotificationTable
          notifications={notifications}
          total={total}
          page={filters.page ?? 1}
          rowsPerPage={filters.limit ?? 10}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          selectedIds={selectedIds}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSortChange={handleSortChange}
          onDelete={handleDelete}
          onSelectEntry={handleSelectEntry}
          onSelectAll={handleSelectAll}
        />

        <SendNotificationDialog
          open={isSendDialogOpen}
          isSubmitting={isSubmitting}
          onClose={() => setIsSendDialogOpen(false)}
          onSend={handleSend}
        />
      </Box>
    </AdminLayout>
  );
};

export default Notifications;
