import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./libs/theme";
import { ToastProvider } from "./hooks";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  </ThemeProvider>
);

export default App;
