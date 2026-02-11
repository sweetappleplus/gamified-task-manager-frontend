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
import { tasksStyles } from "../Tasks.styles";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmColor: "error" | "primary" | "warning";
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  confirmColor,
  isSubmitting,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { bgcolor: "grayscale.800", color: "grayscale.0" },
      }}
    >
      <DialogTitle sx={tasksStyles.dialogTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title}
          <IconButton onClick={onClose} sx={{ color: "grayscale.400" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={tasksStyles.dialogContent}>
        <Typography sx={tasksStyles.deleteDialogText}>{message}</Typography>
      </DialogContent>
      <DialogActions sx={tasksStyles.dialogActions}>
        <Button onClick={onClose} sx={{ color: "grayscale.400" }}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
