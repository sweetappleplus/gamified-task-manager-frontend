import { SxProps, Theme } from "@mui/material";

export const profileStyles: Record<string, SxProps<Theme>> = {
  container: {
    minHeight: "calc(100dvh - 100px)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "space-between", smd: "flex-start" },
    pr: { xs: "0px", smd: "367px" },
    mb: { xs: "8px", smd: "20px" },
    height: { xs: "56px", smd: "auto" },
  },
  headerTitle: {
    order: { xs: 2, smd: 1 },
  },
  headerLeaf: {
    order: { xs: 3, smd: 2 },
    ml: { smd: "auto" },
    display: "flex",
    alignItems: "center",
  },
  headerActive: {
    order: { xs: 1, smd: 3 },
    ml: { smd: "12px" },
  },
  content: {
    display: "flex",
    gap: { xs: "20px", smd: "24px" },
    flexDirection: { xs: "column", smd: "row" },
    flex: 1,
  },
  mainSection: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    order: { xs: 2, smd: 1 },
  },
  rightSection: {
    width: { xs: "100%", smd: "343px" },
    flexShrink: 0,
    order: { xs: 1, smd: 2 },
    mt: { smd: "-45px" },
  },
  rightCard: {
    border: "1px solid",
    borderColor: "grayscale.50",
    borderRadius: "20px",
    overflow: "hidden",
  },
  rightCardInfo: {
    padding: "8px 16px",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    my: "8px",
  },
  infoLabel: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    color: "grayscale.400",
  },
  infoValue: {
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    color: "grayscale.950",
  },
  divider: {
    height: "1px",
    backgroundColor: "grayscale.50",
  },
  recentActivityLabel: {
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 600,
    color: "grayscale.950",
    mb: "12px",
  },
  activityContainer: {
    backgroundColor: "grayscale.50",
    borderRadius: "16px",
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
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
