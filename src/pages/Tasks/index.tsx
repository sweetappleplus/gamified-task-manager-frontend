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
import { useTasksPage } from "./hooks";
import { tasksStyles } from "./Tasks.styles";

const Tasks = () => {
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
  } = useTasksPage();

  return (
    <WorkerLayout activeRoute={ROUTES.TASKS.path}>
      <Box sx={tasksStyles.container}>
        <Text variant="pageTitle" sx={tasksStyles.title}>
          Tasks
        </Text>

        <Box sx={tasksStyles.searchWrapper}>
          <Input
            placeholder="Search tasks"
            leftIcon="search"
            value={search}
            onChange={handleSearchChange}
          />
        </Box>

        <HorizontalScroll gap={8} sx={tasksStyles.filterTags}>
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

        <Box sx={tasksStyles.grid}>
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
          <Box ref={sentinelRef} sx={tasksStyles.sentinel}>
            {isLoading && <Spinner size="sm" message="" />}
          </Box>
        )}

        {!isLoading && tasks.length === 0 && (
          <EmptyState sx={tasksStyles.emptyState} />
        )}
      </Box>
    </WorkerLayout>
  );
};

export default Tasks;
