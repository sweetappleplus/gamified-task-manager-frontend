import { SxProps, Theme } from "@mui/material";

export const levelConfigsStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  title: {
    color: "grayscale.0",
    fontWeight: 600,
  },
  tableContainer: {
    bgcolor: "grayscale.800",
    borderRadius: 2,
    overflow: "hidden",
  },
  tableHead: {
    bgcolor: "grayscale.900",
  },
  tableHeadCell: {
    color: "grayscale.400",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.700",
  },
  tableCell: {
    color: "grayscale.0",
    borderBottom: "1px solid",
    borderColor: "grayscale.700",
  },
  emptyState: {
    textAlign: "center",
    py: 6,
    color: "grayscale.400",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    py: 6,
  },
  dialogContent: {
    bgcolor: "grayscale.800",
  },
  dialogTitle: {
    color: "grayscale.0",
    bgcolor: "grayscale.800",
  },
  dialogActions: {
    bgcolor: "grayscale.800",
    px: 3,
    pb: 2,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "grayscale.0",
      "& fieldset": {
        borderColor: "grayscale.600",
      },
      "&:hover fieldset": {
        borderColor: "grayscale.400",
      },
      "&.Mui-focused fieldset": {
        borderColor: "primary.main",
      },
    },
    "& .MuiInputLabel-root": {
      color: "grayscale.400",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "primary.main",
    },
  },
  disabledTextField: {
    "& .MuiOutlinedInput-root": {
      color: "grayscale.400",
      "& fieldset": {
        borderColor: "grayscale.700",
      },
    },
    "& .MuiInputLabel-root": {
      color: "grayscale.500",
    },
  },
  deleteDialogText: {
    color: "grayscale.300",
  },
  chip: {
    bgcolor: "grayscale.700",
    color: "grayscale.0",
    "& .MuiChip-deleteIcon": {
      color: "grayscale.400",
      "&:hover": {
        color: "grayscale.200",
      },
    },
  },
};
