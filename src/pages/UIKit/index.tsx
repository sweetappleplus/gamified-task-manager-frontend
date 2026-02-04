import { Container, Typography, Box } from "@mui/material";
import { uikitStyles } from "./UIKit.styles";
import {
  Avatar,
  Badge,
  Button,
  Icon,
  Input,
  SocialOauthButton,
} from "../../components/atoms";
import { icons, IconName } from "../../components/atoms/Icon/icons";
import { SocialProvider } from "../../components/atoms/SocialOauthButton/SocialOauthButton.types";
import { AvatarSize } from "../../components/atoms/Avatar/Avatar.types";
import {
  ButtonVariant,
  ButtonSize,
} from "../../components/atoms/Button/Button.types";

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
const buttonVariants: ButtonVariant[] = [
  "primary",
  "secondary",
  "gray",
  "white",
  "text",
  "negative",
  "liquid",
];
const buttonSizes: ButtonSize[] = ["large", "normal", "small", "xs"];

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

          {/* Button - Variants */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - Variants
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {buttonVariants.map((variant) => (
              <Box
                key={variant}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: variant === "liquid" ? 2 : 0,
                  borderRadius: 2,
                  bgcolor:
                    variant === "liquid" ? "grayscale.950" : "transparent",
                }}
              >
                <Button variant={variant} text="Button" />
                <Typography sx={uikitStyles.caseLabel}>{variant}</Typography>
              </Box>
            ))}
          </Box>

          {/* Button - Sizes */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - Sizes
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {buttonSizes.map((size) => (
              <Box
                key={size}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button size={size} text="Button" />
                <Typography sx={uikitStyles.caseLabel}>{size}</Typography>
              </Box>
            ))}
          </Box>

          {/* Button - With Icons */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - With Icons
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button leftIcon="plus" text="Add Item" />
              <Typography sx={uikitStyles.caseLabel}>left icon</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button rightIcon="chevron-right" text="Next" />
              <Typography sx={uikitStyles.caseLabel}>right icon</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button leftIcon="plus" rightIcon="chevron-right" text="Add" />
              <Typography sx={uikitStyles.caseLabel}>both icons</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button leftIcon="plus" />
              <Typography sx={uikitStyles.caseLabel}>icon only</Typography>
            </Box>
          </Box>

          {/* Button - States */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - States
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button text="Default" />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button text="Disabled" disabled />
              <Typography sx={uikitStyles.caseLabel}>disabled</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button text="Loading" loading />
              <Typography sx={uikitStyles.caseLabel}>loading</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button leftIcon="tick" text="Loading" loading />
              <Typography sx={uikitStyles.caseLabel}>
                loading w/ icon
              </Typography>
            </Box>
          </Box>

          {/* Button - Disabled Variants */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - Disabled Variants
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {buttonVariants.map((variant) => (
              <Box
                key={variant}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  p: variant === "liquid" ? 2 : 0,
                  borderRadius: 2,
                  bgcolor:
                    variant === "liquid" ? "grayscale.950" : "transparent",
                }}
              >
                <Button variant={variant} text="Disabled" disabled />
                <Typography sx={uikitStyles.caseLabel}>{variant}</Typography>
              </Box>
            ))}
          </Box>

          {/* Input - Variants */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Input - Variants
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Box sx={{ maxWidth: 320 }}>
              <Input
                placeholder="Номер телефона"
                label="Дополнительная информация"
              />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                normal (empty)
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 320 }}>
              <Input
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                normal (filled)
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 320 }}>
              <Input
                variant="validated"
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                validated
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 320 }}>
              <Input
                variant="error"
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                error
              </Typography>
            </Box>
          </Box>

          {/* Input - With Icons */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Input - With Icons
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <Box sx={{ maxWidth: 320 }}>
              <Input placeholder="Search" leftIcon="search" label="Search" />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                left icon
              </Typography>
            </Box>
            <Box sx={{ maxWidth: 320 }}>
              <Input
                placeholder="Search"
                defaultValue="Search"
                leftIcon="search"
                label="Search"
              />
              <Typography sx={{ ...uikitStyles.caseLabel, mt: 1 }}>
                left icon (filled)
              </Typography>
            </Box>
          </Box>

          {/* Badge */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Badge
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Badge text="1" />
              <Typography sx={uikitStyles.caseLabel}>primary</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Badge variant="secondary" text="5" />
              <Typography sx={uikitStyles.caseLabel}>secondary</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Badge text="99+" />
              <Typography sx={uikitStyles.caseLabel}>wide</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Badge variant="secondary" text="12" />
              <Typography sx={uikitStyles.caseLabel}>secondary wide</Typography>
            </Box>
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
