import { SxProps, Theme } from "@mui/material";

export const loginStyles: Record<string, SxProps<Theme>> = {
  screen: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: "16px",
    backgroundColor: "grayscale.0",
  },
  cardOuter: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "grayscale.50",
    borderRadius: "24px",
    padding: "4px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  cardInner: {
    backgroundColor: "grayscale.0",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  footerEmail: {
    padding: "12px 20px 20px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footerOtp: {
    padding: "8px 20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  socialRow: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },
  socialButton: {
    flex: 1,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: "8px",
  },
  heading: {
    marginTop: "20px",
  },
  subtext: {
    marginTop: "4px",
  },
  input: {
    marginTop: "16px",
  },
  button: {
    marginTop: "12px",
  },
  emailBold: {
    marginTop: "4px",
  },
  otpContainer: {
    marginTop: "20px",
  },
  backButton: {
    position: "absolute",
    top: "8px",
    left: "8px",
  },
};
