import { SxProps, Theme } from "@mui/material";

export const taskCategoriesStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  title: {
    color: "grayscale.900",
    fontWeight: 600,
  },
  tableContainer: {
    bgcolor: "grayscale.0",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grayscale.100",
    overflowX: "auto",
    overflowY: "hidden",
  },
  tableHead: {
    bgcolor: "grayscale.50",
  },
  tableHeadCell: {
    color: "grayscale.600",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  tableCell: {
    color: "grayscale.900",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  descriptionCell: {
    color: "grayscale.600",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    maxWidth: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  emptyState: {
    textAlign: "center",
    py: 6,
    color: "grayscale.500",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    py: 6,
  },
  dialogContent: {},
  dialogTitle: {
    fontWeight: 600,
  },
  dialogActions: {
    px: 3,
    pb: 2,
  },
  textField: {},
  deleteDialogText: {
    color: "grayscale.600",
  },
};
