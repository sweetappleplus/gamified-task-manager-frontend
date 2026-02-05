import { SxProps, Theme } from "@mui/material";

export const uikitStyles: Record<string, SxProps<Theme>> = {
  container: {
    py: 4,
    px: 3,
    minHeight: "100vh",
    backgroundColor: "grayscale.0",
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    mb: 4,
    color: "grayscale.950",
  },
  section: {
    mb: 6,
  },
  sectionTitle: {
    fontWeight: 600,
    fontSize: 20,
    mb: 3,
    color: "grayscale.700",
    borderBottom: 1,
    borderColor: "grayscale.200",
    pb: 1,
  },
  componentLabel: {
    fontWeight: 500,
    fontSize: 14,
    color: "grayscale.500",
    minWidth: 120,
    mb: 2,
  },
  componentRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "center",
    mb: 2,
  },
  componentColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "flex-start",
    mb: 2,
  },
  caseItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  caseLabel: {
    fontSize: 10,
    color: "grayscale.500",
    maxWidth: 80,
    textAlign: "center",
  },
};
