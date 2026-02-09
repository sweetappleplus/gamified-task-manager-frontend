import { SxProps, Theme } from "@mui/material";

export const placeholderStyles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grayscale.50",
  },
  content: {
    textAlign: "center",
  },
  title: {
    fontWeight: 600,
    color: "grayscale.900",
    mb: 2,
  },
  subtitle: {
    color: "grayscale.500",
    mb: 4,
  },
  path: {
    color: "grayscale.600",
  },
};
