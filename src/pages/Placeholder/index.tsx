import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { placeholderStyles } from "./Placeholder.styles";

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
    <Box sx={placeholderStyles.container}>
      <Container maxWidth="md">
        <Box sx={placeholderStyles.content}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={placeholderStyles.title}
          >
            {getPageName()}
          </Typography>
          <Typography variant="h6" sx={placeholderStyles.subtitle}>
            This page is under development
          </Typography>
          <Typography variant="body1" sx={placeholderStyles.path}>
            Path: <code>{location.pathname}</code>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Placeholder;
