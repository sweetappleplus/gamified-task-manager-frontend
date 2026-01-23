import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme/mui.theme";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRouter />
  </ThemeProvider>
);

export default App;
