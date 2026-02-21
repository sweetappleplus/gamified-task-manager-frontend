import { SxProps, Theme } from "@mui/material";

export const financeStyles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  mobileHeader: {
    display: { xs: "flex", md: "none" },
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    mb: "8px",
  },
  header: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: "12px",
    mb: "24px",
  },
  content: {
    display: "flex",
    gap: { xs: "20px", smd: "24px" },
    flexDirection: { xs: "column", smd: "row" },
  },
  mainSection: {
    flex: 1,
    minWidth: 0,
    order: { xs: 2, smd: 1 },
  },
  rightSection: {
    mt: { smd: "-48px" },
    width: { xs: "100%", smd: 343 },
    flexShrink: 0,
    order: { xs: 1, smd: 2 },
    display: "flex",
    flexDirection: "column",
    gap: { xs: "20px", smd: "24px" },
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: "24px",
    fontWeight: 600,
    color: "grayscale.950",
  },
  sectionSubtitle: {
    fontSize: 13,
    lineHeight: "16px",
    fontWeight: 400,
    color: "grayscale.500",
    mt: "2px",
  },
  earningsSection: {},
  earningsSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: "12px",
  },
  chartWrapper: {
    bgcolor: "grayscale.50",
    borderRadius: "16px",
    p: "4px",
  },
  chartContainer: {
    bgcolor: "grayscale.0",
    borderRadius: "12px",
    p: "12px",
    height: 200,
  },
  tabSection: {
    mb: "12px",
  },
  transactionContainer: {
    bgcolor: "grayscale.50",
    borderRadius: "16px",
    p: "4px",
  },
  entryList: {
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
    py: { xs: "48px", smd: 0 },
    minHeight: { smd: "calc(100dvh - 300px)" },
  },
};
