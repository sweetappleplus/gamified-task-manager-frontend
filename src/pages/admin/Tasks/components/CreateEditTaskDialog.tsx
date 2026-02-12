import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskCategory,
  User,
  TASK_PRIORITIES,
  TASK_TYPES,
  TaskPriority,
  TaskType,
} from "types";
import { tasksStyles } from "../Tasks.styles";

type CreateEditTaskDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  task?: Task | null;
  categories: TaskCategory[];
  workers: User[];
  isSubmitting: boolean;
  onClose: () => void;
  onCreate: (data: CreateTaskRequest, files: File[]) => void;
  onEdit: (data: UpdateTaskRequest) => void;
};

const CreateEditTaskDialog = ({
  open,
  mode,
  task,
  categories,
  workers,
  isSubmitting,
  onClose,
  onCreate,
  onEdit,
}: CreateEditTaskDialogProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [steps, setSteps] = useState<string[]>([]);
  const [priority, setPriority] = useState<TaskPriority>(
    TASK_PRIORITIES.MEDIUM
  );
  const [type, setType] = useState<TaskType>(TASK_TYPES.STANDARD);
  const [budget, setBudget] = useState("");
  const [commissionPercent, setCommissionPercent] = useState("");
  const [timeToCompleteMin, setTimeToCompleteMin] = useState<
    number | undefined
  >(undefined);
  const [deadline, setDeadline] = useState("");
  const [maxSubmissionDelayMin, setMaxSubmissionDelayMin] = useState<
    number | undefined
  >(undefined);
  const [categoryId, setCategoryId] = useState<string>("");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && task) {
        setTitle(task.title);
        setDescription(task.description);
        setSteps(task.steps.length > 0 ? [...task.steps] : []);
        setPriority(task.priority);
        setType(task.type);
        setBudget(task.budget);
        setCommissionPercent(task.commissionPercent);
        setTimeToCompleteMin(task.timeToCompleteMin);
        setDeadline(task.deadline.slice(0, 16));
        setMaxSubmissionDelayMin(task.maxSubmissionDelayMin);
        setCategoryId(task.categoryId);
        setAssignedUserId(task.assignedUserId ?? "");
        setFiles([]);
      } else {
        setTitle("");
        setDescription("");
        setSteps([]);
        setPriority(TASK_PRIORITIES.MEDIUM);
        setType(TASK_TYPES.STANDARD);
        setBudget("");
        setCommissionPercent("");
        setTimeToCompleteMin(undefined);
        setDeadline("");
        setMaxSubmissionDelayMin(undefined);
        setCategoryId("");
        setAssignedUserId("");
        setFiles([]);
      }
    }
  }, [open, mode, task]);

  const handleAddStep = () => {
    if (steps.length < 4) {
      setSteps([...steps, ""]);
    }
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 10));
    }
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const isFormValid =
    title.trim().length > 0 &&
    title.trim().length <= 255 &&
    description.trim().length > 0 &&
    steps.filter((s) => s.trim().length > 0).length ===
      steps.filter((s) => s !== "").length &&
    Number(budget) > 0 &&
    Number(commissionPercent) > 0 &&
    Number(commissionPercent) <= 100 &&
    Number(timeToCompleteMin) > 0 &&
    deadline.length > 0 &&
    Number(maxSubmissionDelayMin) >= 0 &&
    categoryId.length > 0;

  const handleSubmit = () => {
    const trimmedSteps = steps.map((s) => s.trim()).filter((s) => s.length > 0);

    if (mode === "create") {
      const data: CreateTaskRequest = {
        title: title.trim(),
        description: description.trim(),
        ...(trimmedSteps.length > 0 ? { steps: trimmedSteps } : {}),
        priority: priority,
        type: type,
        budget: Number(budget),
        commissionPercent: Number(commissionPercent),
        timeToCompleteMin: timeToCompleteMin ?? 0,
        deadline: new Date(deadline).toISOString(),
        maxSubmissionDelayMin: maxSubmissionDelayMin ?? 0,
        categoryId,
        ...(assignedUserId ? { assignedUserId } : {}),
      };
      onCreate(data, files);
    } else {
      const data: UpdateTaskRequest = {
        title: title.trim(),
        description: description.trim(),
        ...(trimmedSteps.length > 0 ? { steps: trimmedSteps } : {}),
        priority: priority,
        type: type,
        budget: Number(budget),
        commissionPercent: Number(commissionPercent),
        timeToCompleteMin: timeToCompleteMin ?? 0,
        deadline: new Date(deadline).toISOString(),
        maxSubmissionDelayMin: maxSubmissionDelayMin ?? 0,
        categoryId,
      };
      onEdit(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={tasksStyles.dialogTitle}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {mode === "create" ? "Create Task" : "Edit Task"}
          <IconButton onClick={onClose} sx={{ color: "grayscale.500" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={tasksStyles.dialogContent}>
        <TextField
          autoFocus
          label="Title"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputProps={{ maxLength: 255 }}
          sx={{ ...tasksStyles.textField, mt: 1 }}
        />

        <TextField
          label="Description"
          fullWidth
          required
          multiline
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ ...tasksStyles.textField, mt: 2 }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ color: "grayscale.600", mb: 1 }}
          >
            Steps (max 4) *
          </Typography>
          {steps.map((step, index) => (
            <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                label={`Step ${index + 1}`}
                fullWidth
                required
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                sx={tasksStyles.textField}
              />
              {steps.length > 1 && (
                <IconButton
                  onClick={() => handleRemoveStep(index)}
                  sx={{ color: "additional.red.main" }}
                >
                  <RemoveIcon />
                </IconButton>
              )}
            </Box>
          ))}
          {steps.length < 4 && (
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddStep}
              sx={{ color: "primary.main" }}
            >
              Add Step
            </Button>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth sx={tasksStyles.selectField}>
            <InputLabel>Priority *</InputLabel>
            <Select
              value={priority}
              label="Priority *"
              onChange={(e) => setPriority(e.target.value)}
            >
              {Object.values(TASK_PRIORITIES).map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={tasksStyles.selectField}>
            <InputLabel>Type *</InputLabel>
            <Select
              value={type}
              label="Type *"
              onChange={(e) => setType(e.target.value)}
            >
              {Object.values(TASK_TYPES).map((t) => (
                <MenuItem key={t} value={t}>
                  {t.replace(/_/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Budget (USD)"
            fullWidth
            required
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            inputProps={{ min: 0, step: "0.01" }}
            sx={tasksStyles.textField}
          />
          <TextField
            label="Commission %"
            fullWidth
            required
            type="number"
            value={commissionPercent}
            onChange={(e) => setCommissionPercent(e.target.value)}
            inputProps={{ min: 0, max: 100, step: "0.01" }}
            sx={tasksStyles.textField}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            label="Time to Complete (min)"
            fullWidth
            required
            type="number"
            value={timeToCompleteMin ?? ""}
            onChange={(e) => setTimeToCompleteMin(Number(e.target.value))}
            inputProps={{ min: 1 }}
            sx={tasksStyles.textField}
          />
          <TextField
            label="Max Delay (min)"
            fullWidth
            required
            type="number"
            value={maxSubmissionDelayMin ?? ""}
            onChange={(e) => setMaxSubmissionDelayMin(Number(e.target.value))}
            inputProps={{ min: 0 }}
            sx={tasksStyles.textField}
          />
        </Box>

        <TextField
          label="Deadline"
          fullWidth
          required
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          sx={{ ...tasksStyles.textField, mt: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <FormControl fullWidth sx={{ ...tasksStyles.selectField, mt: 2 }}>
          <InputLabel>Category *</InputLabel>
          <Select
            value={categoryId}
            label="Category *"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {mode === "create" && (
          <FormControl fullWidth sx={{ ...tasksStyles.selectField, mt: 2 }}>
            <InputLabel>Assign to Worker (optional)</InputLabel>
            <Select
              value={assignedUserId}
              label="Assign to Worker (optional)"
              onChange={(e) => setAssignedUserId(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              {workers.map((w) => (
                <MenuItem key={w.id} value={w.id}>
                  {w.name ? `${w.name} (${w.email})` : w.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {mode === "create" && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "grayscale.600", mb: 1 }}
            >
              Attachments (max 10 files, 10MB each)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              size="small"
              startIcon={<AttachFileIcon />}
              disabled={files.length >= 10}
            >
              Choose Files
              <input type="file" hidden multiple onChange={handleFilesChange} />
            </Button>
            {files.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {files.map((file, index) => (
                  <Chip
                    key={index}
                    label={`${file.name} (${(file.size / 1024).toFixed(1)} KB)`}
                    onDelete={() => handleRemoveFile(index)}
                    size="small"
                    sx={{
                      color: "grayscale.700",
                      bgcolor: "grayscale.100",
                      "& .MuiChip-deleteIcon": {
                        color: "grayscale.400",
                        "&:hover": { color: "additional.red.main" },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={tasksStyles.dialogActions}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Saving..." : mode === "create" ? "Create" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEditTaskDialog;
