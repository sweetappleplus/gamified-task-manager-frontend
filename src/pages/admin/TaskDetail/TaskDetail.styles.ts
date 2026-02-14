import { SxProps, Theme } from "@mui/material";

export const adminTaskDetailStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 3,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  title: {
    color: "grayscale.900",
    fontWeight: 600,
  },
  section: {
    bgcolor: "grayscale.0",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "grayscale.100",
    p: 3,
    mb: 2,
  },
  sectionTitle: {
    color: "grayscale.500",
    fontWeight: 600,
    mb: 2,
  },
  detailLabel: {
    color: "grayscale.500",
    fontSize: "0.75rem",
    mb: 0.5,
  },
  detailValue: {
    color: "grayscale.900",
  },
  actionsRow: {
    display: "flex",
    gap: 1.5,
    flexWrap: "wrap",
  },
};
