import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminLayout } from "components";
import { useTaskCategoriesPage } from "./hooks";
import { taskCategoriesStyles } from "./TaskCategories.styles";
import { TaskCategory } from "types";

const TaskCategories = () => {
  const location = useLocation();
  const {
    categories,
    isLoading,
    isSubmitting,
    dialogMode,
    deleteTarget,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useTaskCategoriesPage();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenCreate = () => {
    setName("");
    setDescription("");
    openCreateDialog();
  };

  const handleOpenEdit = (category: TaskCategory) => {
    setName(category.name);
    setDescription(category.description || "");
    openEditDialog(category);
  };

  const handleSubmit = () => {
    if (dialogMode === "create") {
      handleCreate({
        name: name.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
    } else if (dialogMode === "edit") {
      handleEdit({
        name: name.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
    }
  };

  const isFormValid = name.trim().length > 0 && name.trim().length <= 255;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={taskCategoriesStyles.header}>
          <Typography variant="h5" sx={taskCategoriesStyles.title}>
            Task Categories
          </Typography>
          <Tooltip title="Add Category">
            <IconButton
              onClick={handleOpenCreate}
              sx={{ color: "primary.main" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isLoading ? (
          <Box sx={taskCategoriesStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : categories.length === 0 ? (
          <Box sx={taskCategoriesStyles.emptyState}>
            <Typography variant="body1">No categories found</Typography>
          </Box>
        ) : (
          <TableContainer sx={taskCategoriesStyles.tableContainer}>
            <Table>
              <TableHead sx={taskCategoriesStyles.tableHead}>
                <TableRow>
                  <TableCell sx={taskCategoriesStyles.tableHeadCell}>
                    Name
                  </TableCell>
                  <TableCell sx={taskCategoriesStyles.tableHeadCell}>
                    Description
                  </TableCell>
                  <TableCell sx={taskCategoriesStyles.tableHeadCell}>
                    Created
                  </TableCell>
                  <TableCell
                    sx={taskCategoriesStyles.tableHeadCell}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category: TaskCategory) => (
                  <TableRow key={category.id}>
                    <TableCell sx={taskCategoriesStyles.tableCell}>
                      {category.name}
                    </TableCell>
                    <TableCell sx={taskCategoriesStyles.descriptionCell}>
                      {category.description || "—"}
                    </TableCell>
                    <TableCell sx={taskCategoriesStyles.tableCell}>
                      {formatDate(category.createdAt)}
                    </TableCell>
                    <TableCell
                      sx={taskCategoriesStyles.tableCell}
                      align="right"
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEdit(category)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => openDeleteDialog(category)}
                          sx={{ color: "additional.red.main" }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Create/Edit Dialog */}
        <Dialog
          open={dialogMode !== null}
          onClose={closeDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={taskCategoriesStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {dialogMode === "create" ? "Create Category" : "Edit Category"}
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={taskCategoriesStyles.dialogContent}>
            <TextField
              autoFocus
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputProps={{ maxLength: 255 }}
              sx={{ ...taskCategoriesStyles.textField, mt: 1 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ ...taskCategoriesStyles.textField, mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={taskCategoriesStyles.dialogActions}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : dialogMode === "create"
                  ? "Create"
                  : "Save"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteTarget !== null}
          onClose={closeDeleteDialog}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={taskCategoriesStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Delete Category
              <IconButton
                onClick={closeDeleteDialog}
                sx={{ color: "grayscale.500" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={taskCategoriesStyles.dialogContent}>
            <Typography sx={taskCategoriesStyles.deleteDialogText}>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={taskCategoriesStyles.dialogActions}>
            <Button onClick={closeDeleteDialog} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default TaskCategories;
