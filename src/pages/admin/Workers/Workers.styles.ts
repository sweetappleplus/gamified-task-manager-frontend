import { SxProps, Theme } from "@mui/material";

export const workersStyles: Record<string, SxProps<Theme>> = {
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
  filterBar: {
    display: "flex",
    gap: 2,
    mb: 3,
    flexWrap: "wrap",
    alignItems: "center",
  },
  filterSelect: {
    minWidth: 140,
  },
  searchField: {
    minWidth: 200,
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
    whiteSpace: "nowrap",
  },
  sortableHeadCell: {
    color: "grayscale.600",
    fontWeight: 600,
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    whiteSpace: "nowrap",
    "& .MuiTableSortLabel-root": {
      color: "grayscale.600",
      "&:hover": {
        color: "grayscale.900",
      },
    },
    "& .MuiTableSortLabel-icon": {
      opacity: 0.4,
    },
    "& .MuiTableSortLabel-root.Mui-active": {
      color: "grayscale.900",
      "& .MuiTableSortLabel-icon": {
        opacity: 1,
        color: "primary.main",
      },
    },
  },
  tableCell: {
    color: "grayscale.900",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
  },
  truncatedCell: {
    color: "grayscale.700",
    borderBottom: "1px solid",
    borderColor: "grayscale.100",
    maxWidth: 200,
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
  paginationContainer: {
    borderTop: "1px solid",
    borderColor: "grayscale.100",
  },
  dialogTitle: {
    fontWeight: 600,
  },
  dialogContent: {},
  dialogActions: {
    px: 3,
    pb: 2,
  },
  dialogText: {
    color: "grayscale.600",
  },
};
