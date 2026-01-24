import { Box, Container, Typography } from "@mui/material";
import { useDashboardData } from "./hooks/useDashboardData";
import { dashboardStyles } from "./Dashboard.styles";

const Dashboard = () => {
  const { message, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Box sx={dashboardStyles.container}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={dashboardStyles.title}
        >
          Dashboard
        </Typography>
        <Typography variant="body1">{message}</Typography>
      </Container>
    </Box>
  );
};

export default Dashboard;
