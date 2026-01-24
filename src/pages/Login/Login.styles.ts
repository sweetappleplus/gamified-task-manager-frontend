import { SxProps, Theme } from "@mui/material";

export const loginStyles: Record<string, SxProps<Theme>> = {
  container: {
    py: 4,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    backgroundColor: "background.default",
  },
  title: {
    fontWeight: 600,
    mb: 2,
  },
};
