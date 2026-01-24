import { SxProps, Theme } from "@mui/material";

export const dashboardStyles: Record<string, SxProps<Theme>> = {
  container: {
    py: 4,
    minHeight: "100vh",
    backgroundColor: "background.default",
  },
  title: {
    fontWeight: 600,
    mb: 3,
  },
};
