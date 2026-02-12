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
  Chip,
  Autocomplete,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { AdminLayout } from "components";
import { useLevelConfigsPage } from "./hooks";
import { levelConfigsStyles } from "./LevelConfigs.styles";
import { LevelConfig, TaskType, TASK_TYPES } from "types";
import { PROTECTED_LEVEL_NAMES } from "consts";

const LevelConfigs = () => {
  const location = useLocation();
  const {
    levelConfigs,
    isLoading,
    isSubmitting,
    dialogMode,
    selectedConfig,
    deleteTarget,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    openDeleteDialog,
    closeDeleteDialog,
    handleCreate,
    handleEdit,
    handleDelete,
  } = useLevelConfigsPage();

  const [name, setName] = useState("");
  const [xpRequired, setXpRequired] = useState("");
  const [earningMultiplier, setEarningMultiplier] = useState("");
  const [unlockedTaskTypes, setUnlockedTaskTypes] = useState<TaskType[]>([]);

  const handleOpenCreate = () => {
    setName("");
    setXpRequired("");
    setEarningMultiplier("");
    setUnlockedTaskTypes([]);
    openCreateDialog();
  };

  const handleOpenEdit = (config: LevelConfig) => {
    setName(config.name);
    setXpRequired(String(config.xpRequired));
    setEarningMultiplier(config.earningMultiplier);
    setUnlockedTaskTypes([...config.unlockedTaskTypes]);
    openEditDialog(config);
  };

  const isNameProtected =
    dialogMode === "edit" &&
    selectedConfig !== null &&
    Object.values(PROTECTED_LEVEL_NAMES).includes(selectedConfig.name);

  const handleSubmit = () => {
    if (dialogMode === "create") {
      handleCreate({
        name: name.trim(),
        xpRequired: Number(xpRequired),
        earningMultiplier: earningMultiplier.trim(),
        unlockedTaskTypes,
      });
    } else if (dialogMode === "edit") {
      handleEdit({
        ...(isNameProtected ? {} : { name: name.trim() }),
        xpRequired: Number(xpRequired),
        earningMultiplier: earningMultiplier.trim(),
        unlockedTaskTypes,
      });
    }
  };

  const isFormValid =
    name.trim().length > 0 &&
    xpRequired.trim().length > 0 &&
    Number(xpRequired) >= 0 &&
    Number.isInteger(Number(xpRequired)) &&
    earningMultiplier.trim().length > 0 &&
    Number(earningMultiplier) > 0 &&
    unlockedTaskTypes.length > 0;

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={levelConfigsStyles.header}>
          <Typography variant="h5" sx={levelConfigsStyles.title}>
            Level Configs
          </Typography>
          <Tooltip title="Add Level">
            <IconButton
              onClick={handleOpenCreate}
              sx={{ color: "primary.main" }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {isLoading ? (
          <Box sx={levelConfigsStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : levelConfigs.length === 0 ? (
          <Box sx={levelConfigsStyles.emptyState}>
            <Typography variant="body1">No level configs found</Typography>
          </Box>
        ) : (
          <TableContainer sx={levelConfigsStyles.tableContainer}>
            <Table>
              <TableHead sx={levelConfigsStyles.tableHead}>
                <TableRow>
                  <TableCell sx={levelConfigsStyles.tableHeadCell}>
                    Name
                  </TableCell>
                  <TableCell sx={levelConfigsStyles.tableHeadCell}>
                    XP Required
                  </TableCell>
                  <TableCell sx={levelConfigsStyles.tableHeadCell}>
                    Earning Multiplier
                  </TableCell>
                  <TableCell sx={levelConfigsStyles.tableHeadCell}>
                    Task Types
                  </TableCell>
                  <TableCell
                    sx={levelConfigsStyles.tableHeadCell}
                    align="right"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levelConfigs.map((config: LevelConfig) => (
                  <TableRow key={config.id}>
                    <TableCell sx={levelConfigsStyles.tableCell}>
                      {config.name}
                    </TableCell>
                    <TableCell sx={levelConfigsStyles.tableCell}>
                      {config.xpRequired.toLocaleString()}
                    </TableCell>
                    <TableCell sx={levelConfigsStyles.tableCell}>
                      {config.earningMultiplier}x
                    </TableCell>
                    <TableCell sx={levelConfigsStyles.tableCell}>
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {[...config.unlockedTaskTypes]
                          .sort((a, b) => {
                            const order = ["STANDARD", "HIGH_VALUE", "PREMIUM"];
                            return order.indexOf(a) - order.indexOf(b);
                          })
                          .map((type) => (
                            <Chip
                              key={type}
                              label={type}
                              size="small"
                              sx={levelConfigsStyles.chip}
                            />
                          ))}
                      </Box>
                    </TableCell>
                    <TableCell sx={levelConfigsStyles.tableCell} align="right">
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEdit(config)}
                          sx={{ color: "primary.main" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!Object.values(PROTECTED_LEVEL_NAMES).includes(
                        config.name
                      ) && (
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            onClick={() => openDeleteDialog(config)}
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
        >
          <DialogTitle sx={levelConfigsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {dialogMode === "create" ? "Create Level" : "Edit Level"}
              <IconButton onClick={closeDialog} sx={{ color: "grayscale.500" }}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={levelConfigsStyles.dialogContent}>
            <TextField
              autoFocus={!isNameProtected}
              label="Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isNameProtected}
              inputProps={{ maxLength: 255 }}
              sx={[
                levelConfigsStyles.textField as Record<string, unknown>,
                isNameProtected &&
                  (levelConfigsStyles.disabledTextField as Record<
                    string,
                    unknown
                  >),
                { mt: 1 },
              ]}
            />
            <TextField
              label="XP Required"
              fullWidth
              required
              type="number"
              value={xpRequired}
              onChange={(e) => setXpRequired(e.target.value)}
              inputProps={{ min: 0, step: 1 }}
              sx={{ ...levelConfigsStyles.textField, mt: 2 }}
            />
            <TextField
              label="Earning Multiplier"
              fullWidth
              required
              type="number"
              value={earningMultiplier}
              onChange={(e) => setEarningMultiplier(e.target.value)}
              inputProps={{ min: 0, step: 0.01 }}
              sx={{ ...levelConfigsStyles.textField, mt: 2 }}
            />
            <Autocomplete
              multiple
              options={Object.values(TASK_TYPES)}
              value={unlockedTaskTypes}
              onChange={(_, newValue) =>
                setUnlockedTaskTypes(newValue as TaskType[])
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip
                      key={key}
                      label={option}
                      size="small"
                      sx={levelConfigsStyles.chip}
                      {...tagProps}
                    />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Unlocked Task Types"
                  required
                  sx={{ ...levelConfigsStyles.textField, mt: 2 }}
                />
              )}
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: "grayscale.0",
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={levelConfigsStyles.dialogActions}>
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
          <DialogTitle sx={levelConfigsStyles.dialogTitle}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Delete Level
              <IconButton
                onClick={closeDeleteDialog}
                sx={{ color: "grayscale.500" }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent sx={levelConfigsStyles.dialogContent}>
            <Typography sx={levelConfigsStyles.deleteDialogText}>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;?
              This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={levelConfigsStyles.dialogActions}>
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

export default LevelConfigs;
