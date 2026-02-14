import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./libs/theme";
import { ModalProvider, ToastProvider } from "./hooks";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ToastProvider>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </ToastProvider>
  </ThemeProvider>
);

export default App;
