import { SxProps, Theme } from "@mui/material";

export const tasksStyles: Record<string, SxProps<Theme>> = {
  container: {
    pb: "20px",
  },
  searchWrapper: {
    mt: "12px",
  },
  filterTags: {
    mt: "16px",
  },
  grid: {
    mt: "20px",
    display: "grid",
    gridTemplateColumns: {
      sm: "1fr",
      lg: "repeat(2, 1fr)",
      xl: "repeat(3, 1fr)",
    },
    gap: "12px",
  },
  sentinel: {
    display: "flex",
    justifyContent: "center",
    py: "24px",
  },
  emptyState: {
    display: "flex",
    justifyContent: "center",
    py: "40px",
  },
};
