import { Container, Typography, Box } from "@mui/material";
import { uikitStyles } from "./UIKit.styles";

const UIKit = () => {
  return (
    <Box sx={uikitStyles.container}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" sx={uikitStyles.title}>
          UI Kit
        </Typography>

        {/* Atoms Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Atoms
          </Typography>
          {/* Add atom components here */}
        </Box>

        {/* Molecules Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Molecules
          </Typography>
          {/* Add molecule components here */}
        </Box>

        {/* Organisms Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Organisms
          </Typography>
          {/* Add organism components here */}
        </Box>
      </Container>
    </Box>
  );
};

export default UIKit;
