import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Task, User } from "types";
import { tasksStyles } from "../Tasks.styles";

type AssignTaskDialogProps = {
  open: boolean;
  task: Task | null;
  workers: User[];
  isSubmitting: boolean;
  onClose: () => void;
  onAssign: (assignedUserId: string) => void;
};

const AssignTaskDialog = ({
  open,
  task,
  workers,
  isSubmitting,
  onClose,
  onAssign,
}: AssignTaskDialogProps) => {
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const handleClose = () => {
    setSelectedWorkerId("");
    onClose();
  };

  const handleAssign = () => {
    if (selectedWorkerId) {
      onAssign(selectedWorkerId);
      setSelectedWorkerId("");
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
        <FormControl fullWidth sx={tasksStyles.selectField}>
          <InputLabel>Worker *</InputLabel>
          <Select
            value={selectedWorkerId}
            label="Worker *"
            onChange={(e) => setSelectedWorkerId(e.target.value)}
          >
            {workers.map((w) => (
              <MenuItem key={w.id} value={w.id}>
                {w.name ? `${w.name} (${w.email})` : w.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={tasksStyles.dialogActions}>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleAssign}
          variant="contained"
          disabled={!selectedWorkerId || isSubmitting}
        >
          {isSubmitting ? "Assigning..." : "Assign"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssignTaskDialog;
