import { SxProps, Theme } from "@mui/material";

export const startWorkStyles: Record<string, SxProps<Theme>> = {
  container: {
    pb: "20px",
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100dvh - 68px)",
  },
  title: {
    display: { xs: "none", md: "block" },
  },
  searchWrapper: {
    mt: { xs: "20px", md: "12px" },
  },
  filterTags: {
    mt: "16px",
  },
  grid: {
    mt: "20px",
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      ssm: "repeat(2, 1fr)",
      md: "1fr",
      smd: "repeat(2, 1fr)",
      lg: "repeat(3, 1fr)",
    },
    gap: "12px",
    alignItems: "start",
  },
  sentinel: {
    display: "flex",
    justifyContent: "center",
    py: "24px",
  },
  emptyState: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
