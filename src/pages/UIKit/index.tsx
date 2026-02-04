import { Container, Typography, Box } from "@mui/material";
import { uikitStyles } from "./UIKit.styles";
import { Avatar, Icon, SocialOauthButton } from "../../components/atoms";
import { icons, IconName } from "../../components/atoms/Icon/icons";
import { SocialProvider } from "../../components/atoms/SocialOauthButton/SocialOauthButton.types";
import { AvatarSize } from "../../components/atoms/Avatar/Avatar.types";

const iconNames = Object.keys(icons) as IconName[];
const socialProviders: SocialProvider[] = [
  "google",
  "microsoft",
  "facebook",
  "linkedin",
  "whatsapp",
  "telegram",
  "discord",
];
const avatarSizes: AvatarSize[] = [24, 32, 48, 64, 128];

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

          {/* Icons */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Icons
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {iconNames.map((name) => (
              <Box
                key={name}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: 1.5,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "grayscale.50" },
                }}
              >
                <Icon name={name} size={24} />
                <Typography sx={uikitStyles.caseLabel}>{name}</Typography>
              </Box>
            ))}
          </Box>

          {/* SocialOauthButton */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            SocialOauthButton
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {socialProviders.map((provider) => (
              <Box key={provider} sx={{ width: 60 }}>
                <SocialOauthButton social={provider} />
              </Box>
            ))}
          </Box>

          {/* Avatar */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Avatar
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {avatarSizes.map((size) => (
              <Box
                key={size}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar size={size} email="user@example.com" name="John Doe" />
                <Typography sx={uikitStyles.caseLabel}>{size}px</Typography>
              </Box>
            ))}
          </Box>
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
