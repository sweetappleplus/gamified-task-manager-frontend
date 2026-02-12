import { Container, Typography, Box } from "@mui/material";
import { uikitStyles } from "./UIKit.styles";
import {
  Avatar,
  Badge,
  Button,
  DigitCard,
  Icon,
  IconButton,
  Input,
  Leaf,
  SocialOauthButton,
  Tag,
  Tag2,
  Tag3,
  Text,
  TEXT_VARIANTS,
  ToastVariant,
  OTPInput,
  IconName,
  SocialProvider,
  AvatarSize,
  ButtonVariant,
  ButtonSize,
  LeafVariant,
  ICONS,
  NotificationItem,
  NotificationList,
  Reward,
  Textarea,
  ProgressIndicator,
  PatternPanel,
  Spinner,
  SpinnerSize,
  SidebarNavItem,
  SidebarLinks,
  FooterNavButton,
  FooterNavLinks,
  WorkerSidebar,
  WorkerFooter,
  AdminSidebar,
  AdminLayout,
  WorkerLayout,
  TaskTicket,
  TimeCounter,
  StepsDescription,
  HorizontalScroll,
  UserInfo,
} from "components";
import { ROUTES, WORKER_FOOTER_NAV_ITEMS } from "consts";
import { useToast } from "hooks";
import {
  Task,
  TASK_STATUSES,
  TASK_PRIORITIES,
  TASK_TYPES,
  User,
  USER_ROLES,
} from "types";

const iconNames = Object.keys(ICONS) as IconName[];
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
const leafVariants: LeafVariant[] = ["bronze", "silver", "gold", "diamond"];
const toastVariants: ToastVariant[] = ["info", "success", "warning", "error"];
const spinnerSizes: SpinnerSize[] = ["sm", "md", "lg"];

const mockTaskBase: Task = {
  id: "1",
  title: "Power-Up Mission",
  description: "",
  steps: [],
  priority: TASK_PRIORITIES.MEDIUM,
  type: TASK_TYPES.STANDARD,
  budget: "12",
  commissionPercent: "10",
  timeToCompleteMin: 60,
  deadline: new Date(Date.now() + 86400000).toISOString(),
  maxSubmissionDelayMin: 30,
  status: TASK_STATUSES.PENDING,
  createdById: "u1",
  categoryId: "c1",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  category: { id: "c1", name: "Idea Generation" },
};

const mockWorkerUser: User = {
  id: "u1",
  email: "konstantin@example.com",
  name: "Konstantin Konstantinov",
  role: USER_ROLES.WORKER,
};

const mockAdminUser: User = {
  id: "u2",
  email: "admin@example.com",
  name: "Anna Smith",
  role: USER_ROLES.SUPER_ADMIN,
};

const mockTasks: Task[] = [
  mockTaskBase,
  {
    ...mockTaskBase,
    id: "2",
    title: "Write Product Review",
    priority: TASK_PRIORITIES.HIGH,
    status: TASK_STATUSES.IN_ACTION,
    startedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    category: { id: "c2", name: "Content Creation" },
  },
  {
    ...mockTaskBase,
    id: "3",
    title: "Quick Survey Task",
    priority: TASK_PRIORITIES.LOW,
    status: TASK_STATUSES.FAILED,
    startedAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    category: { id: "c3", name: "Research" },
  },
];

const UIKit = () => {
  const { showToast } = useToast();

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
                  ...uikitStyles.caseItem,
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
              <Box key={size} sx={uikitStyles.caseItem}>
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
                  ...uikitStyles.caseItem,
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
              <Box key={size} sx={uikitStyles.caseItem}>
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
            <Box sx={uikitStyles.caseItem}>
              <Button leftIcon="plus" text="Add Item" />
              <Typography sx={uikitStyles.caseLabel}>left icon</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button rightIcon="chevron-right" text="Next" />
              <Typography sx={uikitStyles.caseLabel}>right icon</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button leftIcon="plus" rightIcon="chevron-right" text="Add" />
              <Typography sx={uikitStyles.caseLabel}>both icons</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button leftIcon="plus" />
              <Typography sx={uikitStyles.caseLabel}>icon only</Typography>
            </Box>
          </Box>

          {/* Button - States */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Button - States
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Button text="Default" />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button text="Disabled" disabled />
              <Typography sx={uikitStyles.caseLabel}>disabled</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button text="Loading" loading />
              <Typography sx={uikitStyles.caseLabel}>loading</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Button leftIcon="tick" text="Loading" loading />
              <Typography sx={uikitStyles.caseLabel}>
                loading with icon
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
                  ...uikitStyles.caseItem,
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
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input
                placeholder="Номер телефона"
                label="Дополнительная информация"
              />
              <Typography sx={uikitStyles.caseLabel}>normal (empty)</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={uikitStyles.caseLabel}>
                normal (filled)
              </Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input
                variant="validated"
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={uikitStyles.caseLabel}>validated</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input
                variant="error"
                placeholder="Номер телефона"
                defaultValue="+7 999 999 99 99"
                label="Дополнительная информация"
              />
              <Typography sx={uikitStyles.caseLabel}>error</Typography>
            </Box>
          </Box>

          {/* Input - With Icons */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Input - With Icons
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input placeholder="Search" leftIcon="search" label="Search" />
              <Typography sx={uikitStyles.caseLabel}>left icon</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, maxWidth: 320 }}>
              <Input
                placeholder="Search"
                defaultValue="Search"
                leftIcon="search"
                label="Search"
              />
              <Typography sx={uikitStyles.caseLabel}>
                left icon (filled)
              </Typography>
            </Box>
          </Box>

          {/* Badge */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Badge
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Badge text="1" />
              <Typography sx={uikitStyles.caseLabel}>primary</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Badge variant="secondary" text="5" />
              <Typography sx={uikitStyles.caseLabel}>secondary</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Badge text="99+" />
              <Typography sx={uikitStyles.caseLabel}>wide</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Badge variant="secondary" text="12" />
              <Typography sx={uikitStyles.caseLabel}>secondary wide</Typography>
            </Box>
          </Box>
          {/* Tag */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Tag
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Tag text="Default" />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag text="Custom" bgColor="primary.50" textColor="primary.600" />
              <Typography sx={uikitStyles.caseLabel}>custom colors</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag
                text="Success"
                bgColor="additional.green.200"
                textColor="additional.green.main"
              />
              <Typography sx={uikitStyles.caseLabel}>green</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag
                text="Error"
                bgColor="additional.red.200"
                textColor="additional.red.main"
              />
              <Typography sx={uikitStyles.caseLabel}>red</Typography>
            </Box>
          </Box>

          {/* Tag2 */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Tag2
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="All" active />
              <Typography sx={uikitStyles.caseLabel}>active</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="In Progress" indicator="primary.main" />
              <Typography sx={uikitStyles.caseLabel}>indicator</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="High Priority" indicator="additional.red.main" />
              <Typography sx={uikitStyles.caseLabel}>indicator</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="Details" indicator="grayscale.400" />
              <Typography sx={uikitStyles.caseLabel}>indicator</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="Premium" icon="star-gold-colored" />
              <Typography sx={uikitStyles.caseLabel}>icon</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag2 text="High-Value" icon="chart" />
              <Typography sx={uikitStyles.caseLabel}>icon</Typography>
            </Box>
          </Box>

          {/* Tag3 */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Tag3
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Tag3 icon="user-square" text="Anna Kowalski" />
              <Typography sx={uikitStyles.caseLabel}>with icon</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag3 text="Content Creation" />
              <Typography sx={uikitStyles.caseLabel}>text only</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Tag3 icon="document-text" text="3" />
              <Typography sx={uikitStyles.caseLabel}>icon + number</Typography>
            </Box>
          </Box>

          {/* Leaf */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Leaf
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {leafVariants.map((variant) => (
              <Box key={variant} sx={uikitStyles.caseItem}>
                <Leaf variant={variant} />
                <Typography sx={uikitStyles.caseLabel}>{variant}</Typography>
              </Box>
            ))}
          </Box>

          {/* Leaf - Custom Text */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Leaf - Custom Text
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {leafVariants.map((variant) => (
              <Box key={variant} sx={uikitStyles.caseItem}>
                <Leaf variant={variant} text="Level 5" />
                <Typography sx={uikitStyles.caseLabel}>
                  {variant} custom
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Toast */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Toast
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {toastVariants.map((variant) => (
              <Box key={variant} sx={uikitStyles.caseItem}>
                <Button
                  variant={variant === "error" ? "negative" : "gray"}
                  size="xs"
                  text={variant}
                  onClick={() =>
                    showToast({
                      variant,
                      message: `This is a ${variant} toast message`,
                    })
                  }
                />
                <Typography sx={uikitStyles.caseLabel}>{variant}</Typography>
              </Box>
            ))}
          </Box>
          {/* Text */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Text
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            {TEXT_VARIANTS.map((variant) => (
              <Box key={variant} sx={uikitStyles.caseItem}>
                <Text variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)} text
                </Text>
                <Typography sx={uikitStyles.caseLabel}>{variant}</Typography>
              </Box>
            ))}
          </Box>

          {/* IconButton */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            IconButton
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <IconButton icon="dots" />
              <Typography sx={uikitStyles.caseLabel}>gray</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <IconButton variant="white" icon="dots" />
              <Typography sx={uikitStyles.caseLabel}>white</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <IconButton icon="bell" />
              <Typography sx={uikitStyles.caseLabel}>gray (bell)</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <IconButton variant="white" icon="bell" />
              <Typography sx={uikitStyles.caseLabel}>white (bell)</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <IconButton icon="plus" disabled />
              <Typography sx={uikitStyles.caseLabel}>disabled</Typography>
            </Box>
          </Box>

          {/* Reward */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Reward
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Reward text="150k" />
              <Typography sx={uikitStyles.caseLabel}>blue</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Reward variant="red" text="20k" />
              <Typography sx={uikitStyles.caseLabel}>red</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Reward variant="orange" text="10k" />
              <Typography sx={uikitStyles.caseLabel}>orange</Typography>
            </Box>
          </Box>

          {/* Textarea */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Textarea
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={{ ...uikitStyles.caseItem, width: 400 }}>
              <Textarea
                placeholder="Add a note or a short explanation (optional)"
                maxLength={300}
              />
              <Typography sx={uikitStyles.caseLabel}>with counter</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, width: 400 }}>
              <Textarea placeholder="Write something..." />
              <Typography sx={uikitStyles.caseLabel}>
                without counter
              </Typography>
            </Box>
          </Box>

          {/* ProgressIndicator - Ring */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            ProgressIndicator - Ring
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {[0, 25, 50, 75, 99, 100].map((pct) => (
              <Box key={pct} sx={uikitStyles.caseItem}>
                <ProgressIndicator variant="ring" percentage={pct} />
                <Typography sx={uikitStyles.caseLabel}>{pct}%</Typography>
              </Box>
            ))}
          </Box>

          {/* ProgressIndicator - Bar */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            ProgressIndicator - Bar
          </Typography>
          <Box
            sx={{
              ...uikitStyles.componentColumn,
              bgcolor: "grayscale.950",
              p: 3,
              borderRadius: 2,
              width: "fit-content",
            }}
          >
            <Box sx={{ ...uikitStyles.caseItem, width: 300 }}>
              <ProgressIndicator variant="bar" percentage={50} color="blue" />
              <Typography sx={uikitStyles.caseLabel}>blue 50%</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, width: 300 }}>
              <ProgressIndicator variant="bar" percentage={50} color="green" />
              <Typography sx={uikitStyles.caseLabel}>green 50%</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, width: 300 }}>
              <ProgressIndicator variant="bar" percentage={0} color="blue" />
              <Typography sx={uikitStyles.caseLabel}>blue 0%</Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, width: 300 }}>
              <ProgressIndicator variant="bar" percentage={100} color="green" />
              <Typography sx={uikitStyles.caseLabel}>green 100%</Typography>
            </Box>
          </Box>

          {/* PatternPanel */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            PatternPanel
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="dots" color="blue">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Dots Blue
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>dots / blue</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="dots" color="green">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Dots Green
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>dots / green</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="magic" color="blue">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Magic Blue
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>magic / blue</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="magic" color="green">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Magic Green
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>magic / green</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="star" color="blue">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Star Blue
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>star / blue</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <PatternPanel variant="star" color="green">
                <Typography sx={{ color: "grayscale.0", fontWeight: 600 }}>
                  Star Green
                </Typography>
              </PatternPanel>
              <Typography sx={uikitStyles.caseLabel}>star / green</Typography>
            </Box>
          </Box>

          {/* Spinner */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            Spinner
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {spinnerSizes.map((size) => (
              <Box key={size} sx={uikitStyles.caseItem}>
                <Spinner size={size} />
                <Typography sx={uikitStyles.caseLabel}>{size}</Typography>
              </Box>
            ))}
            <Box sx={uikitStyles.caseItem}>
              <Spinner message="Please wait..." />
              <Typography sx={uikitStyles.caseLabel}>custom message</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Spinner message="" />
              <Typography sx={uikitStyles.caseLabel}>no message</Typography>
            </Box>
          </Box>

          {/* DigitCard */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            DigitCard
          </Typography>
          <Box
            sx={{
              ...uikitStyles.componentRow,
              bgcolor: "additional.green.main",
              p: 2,
              borderRadius: 2,
              width: "fit-content",
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <Box key={d} sx={uikitStyles.caseItem}>
                <DigitCard digit={d} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Molecules Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Molecules
          </Typography>
          {/* HorizontalScroll */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            HorizontalScroll
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={{ ...uikitStyles.caseItem, width: 400 }}>
              <HorizontalScroll gap={8}>
                <Tag2 text="All" active />
                <Tag2 text="In Progress" indicator="primary.main" />
                <Tag2 text="High Priority" indicator="additional.orange.main" />
                <Tag2 text="Swagger documentation" indicator="grayscale.400" />
                <Tag2
                  text="Frontend task with TailwindCSS"
                  indicator="grayscale.400"
                />
                <Tag2 text="Idea Generation" indicator="grayscale.400" />
                <Tag2 text="Content Creation" indicator="grayscale.400" />
                <Tag2 text="Research" indicator="grayscale.400" />
              </HorizontalScroll>
              <Typography sx={uikitStyles.caseLabel}>
                with Tag2 (swipe or drag)
              </Typography>
            </Box>
            <Box sx={{ ...uikitStyles.caseItem, width: 300 }}>
              <HorizontalScroll gap={8}>
                {buttonVariants.map((variant) => (
                  <Button
                    key={variant}
                    variant={variant}
                    text={variant}
                    size="small"
                  />
                ))}
              </HorizontalScroll>
              <Typography sx={uikitStyles.caseLabel}>with Buttons</Typography>
            </Box>
          </Box>

          {/* StepsDescription */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            StepsDescription
          </Typography>
          <Box sx={{ mb: 2 }}>
            <StepsDescription
              steps={[
                "Download the app from provided link",
                "Use the app for at least 10 minutes",
                "Write a detailed review (minimum 50 words)",
                "Submit screenshot as proof",
              ]}
            />
          </Box>

          {/* TimeCounter */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            TimeCounter
          </Typography>
          <Box
            sx={{
              ...uikitStyles.componentRow,
              bgcolor: "additional.green.main",
              p: 2,
              borderRadius: 2,
              width: "fit-content",
            }}
          >
            <Box sx={uikitStyles.caseItem}>
              <TimeCounter seconds={45518} />
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <TimeCounter seconds={3661} />
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <TimeCounter seconds={0} />
            </Box>
          </Box>

          {/* UserInfo */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            UserInfo
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <UserInfo
                user={mockWorkerUser}
                leafVariant="gold"
                leafText="Gold"
              />
              <Typography sx={uikitStyles.caseLabel}>worker / gold</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <UserInfo
                user={mockAdminUser}
                leafVariant="diamond"
                leafText="Diamond"
              />
              <Typography sx={uikitStyles.caseLabel}>
                admin / diamond
              </Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <UserInfo
                user={mockWorkerUser}
                leafVariant="bronze"
                leafText="Level 1"
              />
              <Typography sx={uikitStyles.caseLabel}>
                custom leaf text
              </Typography>
            </Box>
          </Box>

          {/* TaskTicket */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            TaskTicket
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            {mockTasks.map((task) => (
              <Box key={task.id} sx={{ ...uikitStyles.caseItem, width: 362 }}>
                <TaskTicket task={task} />
                <Typography sx={uikitStyles.caseLabel}>
                  {task.status.toLowerCase()}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* OtpInput */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            OtpInput
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={uikitStyles.caseItem}>
              <OTPInput />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <OTPInput length={4} />
              <Typography sx={uikitStyles.caseLabel}>length=4</Typography>
            </Box>
          </Box>

          {/* NotificationItem */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            NotificationItem
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <NotificationItem
                title="Information"
                content="Lorem ipsum dolor sit amet consectetur. Molestie amet platea lectus et."
              />
              <Typography sx={uikitStyles.caseLabel}>unread</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <NotificationItem
                title="Information"
                content="Lorem ipsum dolor sit amet consectetur. Molestie amet platea lectus et."
                isRead
              />
              <Typography sx={uikitStyles.caseLabel}>read</Typography>
            </Box>
          </Box>

          {/* SidebarNavItem */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            SidebarNavItem
          </Typography>
          <Box sx={uikitStyles.componentColumn}>
            <Box sx={uikitStyles.caseItem}>
              <SidebarNavItem
                icon="home"
                label="Dashboard"
                route={ROUTES.DASHBOARD.path}
              />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <SidebarNavItem
                icon="home"
                label="Dashboard"
                route={ROUTES.DASHBOARD.path}
                isActive
              />
              <Typography sx={uikitStyles.caseLabel}>active</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <SidebarNavItem
                icon="bell"
                label="Notifications"
                route={ROUTES.NOTIFICATIONS.path}
                badge={2}
              />
              <Typography sx={uikitStyles.caseLabel}>with badge</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <SidebarNavItem
                icon="rocket"
                label="Start Work"
                route={ROUTES.START_WORK.path}
                variant="highlighted"
              />
              <Typography sx={uikitStyles.caseLabel}>highlighted</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <SidebarNavItem
                icon="message"
                label="Messages"
                route={ROUTES.CHATS.path}
                badge={99}
              />
              <Typography sx={uikitStyles.caseLabel}>
                with large badge
              </Typography>
            </Box>
          </Box>

          {/* FooterNavButton */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            FooterNavButton
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <FooterNavButton
                icon="home"
                label="Home"
                route={ROUTES.DASHBOARD.path}
              />
              <Typography sx={uikitStyles.caseLabel}>default</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <FooterNavButton
                icon="home"
                label="Home"
                route={ROUTES.DASHBOARD.path}
                isActive
              />
              <Typography sx={uikitStyles.caseLabel}>active</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <FooterNavButton
                icon="rocket"
                label="Start"
                route={ROUTES.START_WORK.path}
                variant="highlighted"
              />
              <Typography sx={uikitStyles.caseLabel}>highlighted</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <FooterNavButton
                icon="lists"
                label="Tasks"
                route={ROUTES.TASKS.path}
              />
              <Typography sx={uikitStyles.caseLabel}>tasks</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <FooterNavButton
                icon="message"
                label="Chats"
                route={ROUTES.CHATS.path}
                isActive
              />
              <Typography sx={uikitStyles.caseLabel}>chats active</Typography>
            </Box>
          </Box>
        </Box>

        {/* Organisms Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Organisms
          </Typography>
          {/* NotificationList */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            NotificationList
          </Typography>
          <Box sx={{ maxWidth: 400, mb: 2 }}>
            <NotificationList
              items={[
                {
                  title: "Information",
                  content:
                    "Lorem ipsum dolor sit amet consectetur. Molestie amet platea lectus et.",
                },
                {
                  title: "Update Available",
                  content:
                    "A new version is available. Please update to get the latest features.",
                },
                {
                  title: "Task Completed",
                  content:
                    "Your task has been marked as completed successfully.",
                  isRead: true,
                },
              ]}
            />
          </Box>

          {/* SidebarLinks */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            SidebarLinks
          </Typography>
          <Box sx={{ maxWidth: 300, mb: 2 }}>
            <SidebarLinks
              items={[
                {
                  icon: "home",
                  label: "Dashboard",
                  route: ROUTES.DASHBOARD.path,
                },
                { icon: "lists", label: "Tasks", route: ROUTES.TASKS.path },
                { icon: "message", label: "Chats", route: ROUTES.CHATS.path },
                {
                  icon: "bell",
                  label: "Notifications",
                  route: ROUTES.NOTIFICATIONS.path,
                  badge: 2,
                },
                {
                  icon: "user-square",
                  label: "Profile",
                  route: ROUTES.PROFILE.path,
                },
                {
                  icon: "rocket",
                  label: "Start Work",
                  route: ROUTES.START_WORK.path,
                  variant: "highlighted",
                },
              ]}
              activeRoute={ROUTES.DASHBOARD.path}
            />
          </Box>

          {/* FooterNavLinks */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            FooterNavLinks
          </Typography>
          <Box sx={{ mb: 2 }}>
            <FooterNavLinks
              items={WORKER_FOOTER_NAV_ITEMS}
              activeRoute={ROUTES.DASHBOARD.path}
            />
          </Box>
        </Box>

        {/* Layouts Section */}
        <Box sx={uikitStyles.section}>
          <Typography variant="h5" sx={uikitStyles.sectionTitle}>
            Layouts
          </Typography>
          {/* WorkerSidebar */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            WorkerSidebar
          </Typography>
          <Box sx={uikitStyles.componentRow}>
            <Box sx={uikitStyles.caseItem}>
              <Box sx={{ maxWidth: 300 }}>
                <WorkerSidebar
                  activeRoute={ROUTES.DASHBOARD.path}
                  notificationCount={2}
                  chatCount={5}
                  user={mockWorkerUser}
                  leafText="Gold"
                  leafVariant="gold"
                />
              </Box>
              <Typography sx={uikitStyles.caseLabel}>regular user</Typography>
            </Box>
            <Box sx={uikitStyles.caseItem}>
              <Box sx={{ maxWidth: 300 }}>
                <WorkerSidebar
                  activeRoute={ROUTES.DASHBOARD.path}
                  notificationCount={10}
                  chatCount={3}
                  user={mockAdminUser}
                  leafText="Bronze"
                  leafVariant="bronze"
                />
              </Box>
              <Typography sx={uikitStyles.caseLabel}>admin user</Typography>
            </Box>
          </Box>

          {/* WorkerFooter */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            WorkerFooter
          </Typography>
          <Box sx={{ mb: 2 }}>
            <WorkerFooter activeRoute={ROUTES.DASHBOARD.path} />
          </Box>

          {/* AdminSidebar */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            AdminSidebar
          </Typography>
          <Box sx={{ mb: 2 }}>
            <AdminSidebar activeRoute={ROUTES.ADMIN_DASHBOARD.path} />
          </Box>

          {/* AdminLayout */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            AdminLayout
          </Typography>
          <Box sx={{ mb: 2 }}>
            <AdminLayout activeRoute={ROUTES.ADMIN_DASHBOARD.path}>
              <Typography variant="h4">Admin Dashboard</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                This is the main content area of the admin layout.
              </Typography>
            </AdminLayout>
          </Box>

          {/* WorkerLayout */}
          <Typography variant="h6" sx={uikitStyles.componentLabel}>
            WorkerLayout
          </Typography>
          <Box
            sx={{
              height: 500,
              mb: 2,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "grayscale.200",
            }}
          >
            <WorkerLayout activeRoute={ROUTES.DASHBOARD.path} chatCount={5}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Dashboard
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 2, color: "grayscale.500" }}
              >
                This is the main content area of the worker layout.
              </Typography>
            </WorkerLayout>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UIKit;
