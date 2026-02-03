import { createTheme } from "@mui/material/styles";
import { FontFamily } from "../../styles/fonts";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
  typography: {
    fontFamily: FontFamily.primary,
  },
});
