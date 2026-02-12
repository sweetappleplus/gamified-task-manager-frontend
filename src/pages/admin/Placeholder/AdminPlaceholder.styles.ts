import { SxProps, Theme } from "@mui/material";

export const adminPlaceholderStyles: Record<string, SxProps<Theme>> = {
  content: {
    textAlign: "center",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    color: "grayscale.400",
  },
};
