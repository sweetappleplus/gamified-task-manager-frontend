import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import { AdminLayout } from "components";
import { useTasksPage } from "./hooks";
import { tasksStyles } from "./Tasks.styles";
import {
  TaskFilters,
  TaskTable,
  CreateEditTaskDialog,
  AssignTaskDialog,
  ReviewTaskDialog,
  TaskDetailDialog,
  ConfirmDialog,
  BulkGenerateTasksDialog,
} from "./components";

const Tasks = () => {
  const location = useLocation();
  const {
    tasks,
    total,
    isLoading,
    filters,
    categories,
    workers,
    isSubmitting,
    dialogMode,
    selectedTask,
    assignTarget,
    reviewTarget,
    detailTarget,
    cancelTarget,
    deleteTarget,
    markPaidTarget,
    bulkGenerateOpen,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openAssignDialog,
    closeAssignDialog,
    openReviewDialog,
    closeReviewDialog,
    openDetailDialog,
    closeDetailDialog,
    openCancelDialog,
    closeCancelDialog,
    openDeleteDialog,
    closeDeleteDialog,
    openMarkPaidDialog,
    closeMarkPaidDialog,
    openBulkGenerateDialog,
    closeBulkGenerateDialog,
    handleCreate,
    handleEdit,
    handleDelete,
    handleAssign,
    handleReview,
    handleCancel,
    handleMarkPaid,
    handleBulkGenerate,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
  } = useTasksPage();

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={tasksStyles.header}>
          <Typography variant="h5" sx={tasksStyles.title}>
            Task Management
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              startIcon={<DynamicFeedIcon />}
              onClick={openBulkGenerateDialog}
            >
              Generate Tasks
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openCreateDialog}
            >
              Create Task
            </Button>
          </Box>
        </Box>

        <TaskFilters
          filters={filters}
          categories={categories}
          workers={workers}
          onFilterChange={handleFilterChange}
        />

        <TaskTable
          tasks={tasks}
          total={total}
          page={filters.page ?? 1}
          rowsPerPage={filters.limit ?? 10}
          isLoading={isLoading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSortChange={handleSortChange}
          onEdit={openEditDialog}
          onDelete={openDeleteDialog}
          onAssign={openAssignDialog}
          onReview={openReviewDialog}
          onMarkPaid={openMarkPaidDialog}
          onCancel={openCancelDialog}
          onViewDetail={openDetailDialog}
        />

        <CreateEditTaskDialog
          open={dialogMode !== null}
          mode={dialogMode === "edit" ? "edit" : "create"}
          task={selectedTask}
          categories={categories}
          workers={workers}
          isSubmitting={isSubmitting}
          onClose={closeDialog}
          onCreate={handleCreate}
          onEdit={handleEdit}
        />

        <AssignTaskDialog
          open={assignTarget !== null}
          task={assignTarget}
          workers={workers}
          isSubmitting={isSubmitting}
          onClose={closeAssignDialog}
          onAssign={handleAssign}
        />

        <ReviewTaskDialog
          open={reviewTarget !== null}
          task={reviewTarget}
          isSubmitting={isSubmitting}
          onClose={closeReviewDialog}
          onReview={handleReview}
        />

        <TaskDetailDialog
          open={detailTarget !== null}
          task={detailTarget}
          onClose={closeDetailDialog}
        />

        <ConfirmDialog
          open={cancelTarget !== null}
          title="Cancel Task"
          message={`Are you sure you want to cancel "${cancelTarget?.title}"? This action cannot be undone.`}
          confirmLabel="Cancel Task"
          confirmColor="warning"
          isSubmitting={isSubmitting}
          onClose={closeCancelDialog}
          onConfirm={handleCancel}
        />

        <ConfirmDialog
          open={deleteTarget !== null}
          title="Delete Task"
          message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          confirmColor="error"
          isSubmitting={isSubmitting}
          onClose={closeDeleteDialog}
          onConfirm={handleDelete}
        />

        <ConfirmDialog
          open={markPaidTarget !== null}
          title="Mark as Paid"
          message={`Mark "${markPaidTarget?.title}" as paid? This will finalize the task payment.`}
          confirmLabel="Mark Paid"
          confirmColor="primary"
          isSubmitting={isSubmitting}
          onClose={closeMarkPaidDialog}
          onConfirm={handleMarkPaid}
        />

        <BulkGenerateTasksDialog
          open={bulkGenerateOpen}
          categories={categories}
          workers={workers}
          isSubmitting={isSubmitting}
          onClose={closeBulkGenerateDialog}
          onGenerate={handleBulkGenerate}
        />
      </Box>
    </AdminLayout>
  );
};

export default Tasks;
