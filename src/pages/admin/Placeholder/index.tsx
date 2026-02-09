import { Box, Container, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { AdminLayout } from "components";
import { adminPlaceholderStyles } from "./AdminPlaceholder.styles";

const AdminPlaceholder = () => {
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
    <AdminLayout activeRoute={location.pathname}>
      <Container maxWidth="md">
        <Box sx={adminPlaceholderStyles.content}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={adminPlaceholderStyles.title}
          >
            {getPageName()}
          </Typography>
          <Typography variant="h6" sx={adminPlaceholderStyles.subtitle}>
            This page is under development
          </Typography>
          <Typography variant="body1" sx={adminPlaceholderStyles.path}>
            Path: <code>{location.pathname}</code>
          </Typography>
        </Box>
      </Container>
    </AdminLayout>
  );
};

export default AdminPlaceholder;
