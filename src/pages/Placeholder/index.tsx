import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Placeholder = () => {
  const location = useLocation();

  const getPageName = () => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "home";
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grayscale.50",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "grayscale.900",
              mb: 2,
            }}
          >
            {getPageName()}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "grayscale.500",
              mb: 4,
            }}
          >
            This page is under development
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "grayscale.600",
            }}
          >
            Path: <code>{location.pathname}</code>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Placeholder;
