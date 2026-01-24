import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./libs";
import AppRouter from "./routes/AppRouter";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppRouter />
  </ThemeProvider>
);

export default App;
