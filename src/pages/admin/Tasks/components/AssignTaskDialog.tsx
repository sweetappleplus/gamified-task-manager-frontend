import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task, User, USER_ROLES } from "types";
import { useUserSelect } from "hooks";
import { UserSelectField } from "components";
import { tasksStyles } from "../Tasks.styles";

type AssignTaskDialogProps = {
  open: boolean;
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onAssign: (assignedUserId: string) => void;
};

const AssignTaskDialog = ({
  open,
  task,
  isSubmitting,
  onClose,
  onAssign,
}: AssignTaskDialogProps) => {
  const [selectedWorker, setSelectedWorker] = useState<User | null>(null);
  const userSelect = useUserSelect({ role: USER_ROLES.WORKER });

  const handleClose = () => {
    setSelectedWorker(null);
    onClose();
  };

  const handleAssign = () => {
    if (selectedWorker) {
      onAssign(selectedWorker.id);
      setSelectedWorker(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={tasksStyles.dialogTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Assign Task
          <IconButton onClick={handleClose} sx={{ color: "grayscale.500" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={tasksStyles.dialogContent}>
        <Typography sx={{ color: "grayscale.600", mb: 2 }}>
          Assign &quot;{task?.title}&quot; to a worker
        </Typography>
        <UserSelectField
          users={userSelect.users}
          isLoading={userSelect.isLoading}
          hasMore={userSelect.hasMore}
          onLoadMore={userSelect.loadMore}
          onSearch={userSelect.setSearch}
          value={selectedWorker}
          onChange={setSelectedWorker}
          label="Worker *"
          size="medium"
        />
      </DialogContent>
      <DialogActions sx={tasksStyles.dialogActions}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          variant="contained"
          disabled={!selectedWorker || isSubmitting}
        >
          {isSubmitting ? "Assigning..." : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignTaskDialog;
