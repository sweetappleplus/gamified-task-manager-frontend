import { Box, Typography } from "@mui/material";
import {
  Text,
  WorkerLayout,
  WorkerProfileCard,
  ActivityLog as ActivityLogItem,
  Spinner,
  Tag,
  Leaf,
  EmptyState,
} from "components";
import { ROUTES } from "consts";
import { formatDate } from "utils";
import { useProfilePage } from "./hooks";
import { profileStyles } from "./Profile.styles";

const Profile = () => {
  const {
    user,
    activityLogs,
    isLoading,
    hasMore,
    sentinelRef,
    taskCompleted,
    totalEarnings,
    joinedDate,
    leafVariant,
    leafText,
  } = useProfilePage();

  if (!user) return null;

  return (
    <WorkerLayout activeRoute={ROUTES.PROFILE.path}>
      <Box sx={profileStyles.container}>
        <Box sx={profileStyles.header}>
          {user.isActive && (
            <Box sx={profileStyles.headerActive}>
              <Tag
                text="Active"
                bgColor="additional.green.200"
                textColor="additional.green.main"
              />
            </Box>
          )}
          <Box sx={profileStyles.headerTitle}>
            <Text variant="pageTitle">Profile</Text>
          </Box>
          {leafVariant && (
            <Box sx={profileStyles.headerLeaf}>
              <Leaf variant={leafVariant} text={leafText} />
            </Box>
          )}
        </Box>

        <Box sx={profileStyles.content}>
          {/* Main Section */}
          <Box sx={profileStyles.mainSection}>
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <Typography sx={profileStyles.recentActivityLabel}>
                Recent Activity
              </Typography>

              {isLoading && activityLogs.length === 0 && (
                <Box sx={profileStyles.emptyState}>
                  <Spinner size="sm" message="" />
                </Box>
              )}

              {!isLoading && activityLogs.length === 0 && (
                <EmptyState sx={profileStyles.emptyState} />
              )}

              {activityLogs.length > 0 && (
                <Box sx={profileStyles.activityContainer}>
                  {activityLogs.map((log) => (
                    <ActivityLogItem
                      key={log.id}
                      type={log.activityType}
                      message={log.logMessage}
                      date={formatDate(log.createdAt)}
                    />
                  ))}
                </Box>
              )}

              {activityLogs.length > 0 && hasMore && (
                <Box ref={sentinelRef} sx={profileStyles.sentinel}>
                  {isLoading && <Spinner size="sm" message="" />}
                </Box>
              )}
            </Box>
          </Box>

          {/* Right Section */}
          <Box sx={profileStyles.rightSection}>
            <Box sx={profileStyles.rightCard}>
              <WorkerProfileCard
                user={user}
                taskCompleted={taskCompleted}
                totalEarnings={totalEarnings}
              />

              <Box sx={profileStyles.rightCardInfo}>
                <Box sx={profileStyles.infoItem}>
                  <Typography sx={profileStyles.infoLabel}>E-mail</Typography>
                  <Typography sx={profileStyles.infoValue}>
                    {user.email}
                  </Typography>
                </Box>

                <Box sx={profileStyles.divider} />

                <Box sx={profileStyles.infoItem}>
                  <Typography sx={profileStyles.infoLabel}>Joined</Typography>
                  <Typography sx={profileStyles.infoValue}>
                    {joinedDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </WorkerLayout>
  );
};

export default Profile;
