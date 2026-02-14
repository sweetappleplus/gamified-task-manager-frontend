import { SxProps, Theme } from "@mui/material";

export const taskDetailStyles: Record<string, SxProps<Theme>> = {
  header: {
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    gap: "12px",
    mb: "24px",
  },
  content: {
    display: "flex",
    gap: "24px",
    flexDirection: { xs: "column", smd: "row" },
    mt: { xs: "32px", md: "0px" },
  },
  mainSection: {
    flex: 1,
    minWidth: 0,
  },
  rightSection: {
    width: { xs: "100%", smd: 343 },
    flexShrink: 0,
  },
  submissionHistory: {
    mt: { xs: "32px", lg: "24px" },
  },
  rewardsEconomics: {
    mt: { xs: "32px", lg: "24px" },
  },
  balanceCard: {
    mt: "12px",
  },
  remainingTime: {
    mb: { xs: "32px", lg: "24px" },
  },
  stepsDescription: {
    mb: "24px",
  },
  completeButton: {
    width: "100%",
  },
};
