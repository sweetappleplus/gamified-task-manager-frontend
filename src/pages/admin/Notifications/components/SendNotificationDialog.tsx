import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import {
  NOTIFICATION_TYPES,
  NotificationType,
  User,
  CreateNotificationPayload,
} from "types";
import { useUserSelect } from "hooks";
import { UserSelectField } from "components";

type SendNotificationDialogProps = {
  open: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSend: (payload: CreateNotificationPayload) => void;
};

const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPES.TASK_ASSIGNED]: "Task Assigned",
  [NOTIFICATION_TYPES.TASK_APPROVED]: "Task Approved",
  [NOTIFICATION_TYPES.TASK_REJECTED]: "Task Rejected",
  [NOTIFICATION_TYPES.TASK_CANCELLED]: "Task Cancelled",
  [NOTIFICATION_TYPES.PAYMENT_RECORDED]: "Payment Recorded",
  [NOTIFICATION_TYPES.WORKER_JOINED]: "Worker Joined",
  [NOTIFICATION_TYPES.TASK_SUBMITTED]: "Task Submitted",
};

const SendNotificationDialog = ({
  open,
  isSubmitting,
  onClose,
  onSend,
}: SendNotificationDialogProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [type, setType] = useState<NotificationType>(
    NOTIFICATION_TYPES.TASK_ASSIGNED
  );
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [relatedTaskId, setRelatedTaskId] = useState("");
  const userSelect = useUserSelect();

  const handleSend = () => {
    if (!selectedUser || !title.trim() || !message.trim()) return;

    onSend({
      userId: selectedUser.id,
      type,
      title: title.trim(),
      message: message.trim(),
      ...(relatedTaskId.trim() ? { relatedTaskId: relatedTaskId.trim() } : {}),
    });
  };

  const handleClose = () => {
    setSelectedUser(null);
    setType(NOTIFICATION_TYPES.TASK_ASSIGNED);
    setTitle("");
    setMessage("");
    setRelatedTaskId("");
    onClose();
  };

  const isValid = selectedUser && title.trim() && message.trim();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Send Notification</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <UserSelectField
            users={userSelect.users}
            isLoading={userSelect.isLoading}
            hasMore={userSelect.hasMore}
            onLoadMore={userSelect.loadMore}
            onSearch={userSelect.setSearch}
            value={selectedUser}
            onChange={setSelectedUser}
            label="Recipient"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value as NotificationType)}
            >
              {Object.entries(NOTIFICATION_TYPE_LABELS).map(
                ([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            inputProps={{ maxLength: 255 }}
          />

          <TextField
            size="small"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            multiline
            rows={3}
            inputProps={{ maxLength: 1024 }}
          />

          <TextField
            size="small"
            label="Related Task ID (optional)"
            value={relatedTaskId}
            onChange={(e) => setRelatedTaskId(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={!isValid || isSubmitting}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendNotificationDialog;
