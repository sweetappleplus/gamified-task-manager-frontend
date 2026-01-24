import { Container, Typography, Box } from "@mui/material";
import { loginStyles } from "./Login.styles";

const Login = () => {
  return (
    <Box sx={loginStyles.container}>
      <Container maxWidth="sm">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={loginStyles.title}
        >
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Login page content will be implemented here
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
