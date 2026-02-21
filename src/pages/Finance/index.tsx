import { Box } from "@mui/material";
import {
  Button,
  Icon,
  Text,
  WorkerLayout,
  WalletCard,
  Tab,
  Spinner,
  EmptyState,
} from "components";
import { ROUTES } from "consts";
import { useFinancePage } from "./hooks";
import { financeStyles } from "./Finance.styles";
import { EarningsOverview, TransactionList } from "./components";

const Finance = () => {
  const {
    balance,
    withdrawable,
    pendingPayments,
    isSummaryLoading,
    earningsOverview,
    isEarningsOverviewLoading,
    earningsPeriod,
    periodOptions,
    handlePeriodChange,
    entries,
    isLoading,
    hasMore,
    activeTab,
    tabItems,
    handleTabChange,
    handleBack,
    handleWithdraw,
    sentinelRef,
  } = useFinancePage();

  return (
    <WorkerLayout activeRoute={ROUTES.FINANCE.path}>
      <Box sx={financeStyles.container}>
        {/* Mobile header */}
        <Box sx={financeStyles.mobileHeader}>
          <Box
            onClick={handleBack}
            sx={{ cursor: "pointer", display: "flex", color: "grayscale.950" }}
          >
            <Icon name="chevron-left" size={24} />
          </Box>
          <Text variant="pageTitle">Finance</Text>
          <Box sx={{ width: 24 }} />
        </Box>

        {/* Desktop header */}
        <Box sx={financeStyles.header}>
          <Button
            variant="gray"
            size="xs"
            leftIcon="chevron-left"
            text="Back"
            onClick={handleBack}
          />
          <Text variant="pageTitle">Finance</Text>
        </Box>

        <Box sx={financeStyles.content}>
          {/* Left / Main Section */}
          <Box sx={financeStyles.mainSection}>
            <Box sx={financeStyles.tabSection}>
              <Tab
                items={tabItems}
                value={activeTab}
                onChange={handleTabChange}
              />
            </Box>

            {!isLoading && entries.length === 0 ? (
              <EmptyState sx={financeStyles.emptyState} />
            ) : (
              <Box sx={financeStyles.transactionContainer}>
                <TransactionList
                  entries={entries}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  sentinelRef={sentinelRef}
                />
              </Box>
            )}
          </Box>

          {/* Right Section */}
          <Box sx={financeStyles.rightSection}>
            {isSummaryLoading ? (
              <Box
                sx={{ display: "flex", justifyContent: "center", py: "24px" }}
              >
                <Spinner size="sm" message="" />
              </Box>
            ) : (
              <WalletCard
                balance={balance}
                totalEarnings={withdrawable}
                pending={pendingPayments}
                onWithdraw={handleWithdraw}
              />
            )}

            <EarningsOverview
              data={earningsOverview}
              isLoading={isEarningsOverviewLoading}
              period={earningsPeriod}
              periodOptions={periodOptions}
              onPeriodChange={handlePeriodChange}
            />
          </Box>
        </Box>
      </Box>
    </WorkerLayout>
  );
};

export default Finance;
