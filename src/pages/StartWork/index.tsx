import { Box } from "@mui/material";
import {
  Text,
  Input,
  Tag2,
  TaskTicket,
  Spinner,
  WorkerLayout,
  HorizontalScroll,
  EmptyState,
} from "components";
import { ROUTES } from "consts";
import { useStartWorkPage } from "./hooks";
import { startWorkStyles } from "./StartWork.styles";

const StartWork = () => {
  const {
    tasks,
    isLoading,
    search,
    activeFilter,
    filterTags,
    hasMore,
    handleSearchChange,
    handleFilterChange,
    handleTicketClick,
    handleStartTask,
    sentinelRef,
  } = useStartWorkPage();

  return (
    <WorkerLayout activeRoute={ROUTES.START_WORK.path}>
      <Box sx={startWorkStyles.container}>
        <Text variant="pageTitle" sx={startWorkStyles.title}>
          Start Work
        </Text>

        <Box sx={startWorkStyles.searchWrapper}>
          <Input
            placeholder="Search tasks"
            leftIcon="search"
            value={search}
            onChange={handleSearchChange}
          />
        </Box>

        <HorizontalScroll gap={8} sx={startWorkStyles.filterTags}>
          {filterTags.map((tag) => (
            <Tag2
              key={tag.id}
              text={tag.text}
              indicator={tag.indicator}
              active={activeFilter === tag.id}
              onClick={() => handleFilterChange(tag.id)}
            />
          ))}
        </HorizontalScroll>

        <Box sx={startWorkStyles.grid}>
          {tasks.map((task) => (
            <TaskTicket
              key={task.id}
              task={task}
              onClick={handleTicketClick}
              onStart={handleStartTask}
            />
          ))}
        </Box>

        {hasMore && (
          <Box ref={sentinelRef} sx={startWorkStyles.sentinel}>
            {isLoading && <Spinner size="sm" message="" />}
          </Box>
        )}

        {!isLoading && tasks.length === 0 && (
          <EmptyState sx={startWorkStyles.emptyState} />
        )}
      </Box>
    </WorkerLayout>
  );
};

export default StartWork;
