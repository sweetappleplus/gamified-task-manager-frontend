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
import { useSystemSettingsPage } from "./hooks";
import { systemSettingsStyles } from "./SystemSettings.styles";
import { SystemSetting } from "types";
import { PROTECTED_SETTING_KEYS } from "consts";

const SystemSettings = () => {
  const location = useLocation();
  const {
    settings,
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
  } = useSystemSettingsPage();

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  const handleOpenCreate = () => {
    setKey("");
    setValue("");
    setDescription("");
    openCreateDialog();
  };

  const handleOpenEdit = (setting: SystemSetting) => {
    setKey(setting.key);
    setValue(setting.value);
    setDescription(setting.description || "");
    openEditDialog(setting);
  };

  const handleSubmit = () => {
    if (dialogMode === "create") {
      handleCreate({
        key: key.trim(),
        value: value.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
    } else if (dialogMode === "edit") {
      handleEdit({
        value: value.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
      });
    }
  };

  const isFormValid =
    dialogMode === "create"
      ? key.trim().length > 0 && value.trim().length > 0
      : value.trim().length > 0;

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
        <Box sx={systemSettingsStyles.header}>
          <Typography variant="h5" sx={systemSettingsStyles.title}>
            System Settings
          </Typography>
          <Tooltip title="Add Setting">
            <IconButton
              onClick={handleOpenCreate}
              sx={{ color: "primary.main" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isLoading ? (
          <Box sx={systemSettingsStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : settings.length === 0 ? (
          <Box sx={systemSettingsStyles.emptyState}>
            <Typography variant="body1">No settings found</Typography>
          </Box>
        ) : (
          <TableContainer sx={systemSettingsStyles.tableContainer}>
            <Table>
              <TableHead sx={systemSettingsStyles.tableHead}>
                <TableRow>
                  <TableCell sx={systemSettingsStyles.tableHeadCell}>
                    Key
                  </TableCell>
                  <TableCell sx={systemSettingsStyles.tableHeadCell}>
                    Value
                  </TableCell>
                  <TableCell sx={systemSettingsStyles.tableHeadCell}>
                    Description
                  </TableCell>
                  <TableCell sx={systemSettingsStyles.tableHeadCell}>
                    Created
                  </TableCell>
                  <TableCell
                    sx={systemSettingsStyles.tableHeadCell}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {settings.map((setting: SystemSetting) => (
                  <TableRow key={setting.key}>
                    <TableCell sx={systemSettingsStyles.tableCell}>
                      {setting.key}
                    </TableCell>
                    <TableCell sx={systemSettingsStyles.tableCell}>
                      {setting.value}
                    </TableCell>
                    <TableCell sx={systemSettingsStyles.descriptionCell}>
                      {setting.description || "—"}
                    </TableCell>
                    <TableCell sx={systemSettingsStyles.tableCell}>
                      {formatDate(setting.createdAt)}
                    </TableCell>
                    <TableCell
                      sx={systemSettingsStyles.tableCell}
                      align="right"
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEdit(setting)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!PROTECTED_SETTING_KEYS.includes(setting.key) && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(setting)}
                            sx={{ color: "additional.red.main" }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
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
          PaperProps={{
            sx: { bgcolor: "grayscale.800", color: "grayscale.0" },
          }}
        >
          <DialogTitle sx={systemSettingsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {dialogMode === "create" ? "Create Setting" : "Edit Setting"}
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.400" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={systemSettingsStyles.dialogContent}>
            <TextField
              autoFocus={dialogMode === "create"}
              label="Key"
              fullWidth
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
              disabled={dialogMode === "edit"}
              sx={[
                systemSettingsStyles.textField as Record<string, unknown>,
                dialogMode === "edit" &&
                  (systemSettingsStyles.disabledTextField as Record<
                    string,
                    unknown
                  >),
                { mt: 1 },
              ]}
            />
            <TextField
              autoFocus={dialogMode === "edit"}
              label="Value"
              fullWidth
              required
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ ...systemSettingsStyles.textField, mt: 2 }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ ...systemSettingsStyles.textField, mt: 2 }}
            />
          </DialogContent>
          <DialogActions sx={systemSettingsStyles.dialogActions}>
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
          PaperProps={{
            sx: { bgcolor: "grayscale.800", color: "grayscale.0" },
          }}
        >
          <DialogTitle sx={systemSettingsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Delete Setting
              <IconButton
                onClick={closeDeleteDialog}
                sx={{ color: "grayscale.400" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={systemSettingsStyles.dialogContent}>
            <Typography sx={systemSettingsStyles.deleteDialogText}>
              Are you sure you want to delete &quot;{deleteTarget?.key}&quot;?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={systemSettingsStyles.dialogActions}>
            <Button onClick={closeDeleteDialog} sx={{ color: "grayscale.400" }}>
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

export default SystemSettings;
