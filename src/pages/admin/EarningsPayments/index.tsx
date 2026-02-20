import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import { AdminLayout } from "components";
import { useEarningsPaymentsPage } from "./hooks";
import { earningsStyles } from "./EarningsPayments.styles";
import { SummaryCards, LedgerFilters, LedgerTable } from "./components";

const EarningsPayments = () => {
  const location = useLocation();
  const {
    entries,
    total,
    isLoading,
    filters,
    summary,
    isSummaryLoading,
    isSubmitting,
    selectedIds,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSortChange,
    handleMarkAsPaid,
    handleMarkAsUnpaid,
    handleBulkMarkAsPaid,
    handleSelectEntry,
    handleSelectAll,
  } = useEarningsPaymentsPage();

  return (
    <AdminLayout activeRoute={location.pathname}>
      <Box>
        <Box sx={earningsStyles.header}>
          <Typography variant="h5" sx={earningsStyles.title}>
            Earnings & Payments
          </Typography>
          {selectedIds.length > 0 && (
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              onClick={handleBulkMarkAsPaid}
              disabled={isSubmitting}
            >
              Mark {selectedIds.length} as Paid
            </Button>
          )}
        </Box>

        <SummaryCards summary={summary} isLoading={isSummaryLoading} />

        <LedgerFilters filters={filters} onFilterChange={handleFilterChange} />

        <LedgerTable
          entries={entries}
          total={total}
          page={filters.page ?? 1}
          rowsPerPage={filters.limit ?? 10}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          selectedIds={selectedIds}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onSortChange={handleSortChange}
          onMarkAsPaid={handleMarkAsPaid}
          onMarkAsUnpaid={handleMarkAsUnpaid}
          onSelectEntry={handleSelectEntry}
          onSelectAll={handleSelectAll}
        />
      </Box>
    </AdminLayout>
  );
};

export default EarningsPayments;
