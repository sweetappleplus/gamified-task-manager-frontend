import React from "react";
import { Box, Typography } from "@mui/material";
import { BarChart, Dropdown, Spinner } from "components";
import { EarningsOverviewItem } from "types";
import { financeStyles } from "../Finance.styles";

interface EarningsOverviewProps {
  data: EarningsOverviewItem[];
  isLoading: boolean;
  period: string;
  periodOptions: { label: string; value: string }[];
  onPeriodChange: (value: string) => void;
}

export const EarningsOverview: React.FC<EarningsOverviewProps> = ({
  data,
  isLoading,
  period,
  periodOptions,
  onPeriodChange,
}) => {
  const chartData = data.map((item) => ({
    label: item.label,
    value: parseFloat(item.total),
  }));

  return (
    <Box sx={financeStyles.earningsSection}>
      <Box sx={financeStyles.earningsSectionHeader}>
        <Typography sx={financeStyles.sectionTitle}>
          Earnings Overview
        </Typography>
        <Dropdown
          items={periodOptions}
          value={period}
          onChange={onPeriodChange}
        />
      </Box>
      <Box sx={financeStyles.chartWrapper}>
        {isLoading ? (
          <Box
            sx={{
              ...financeStyles.chartContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner size="sm" message="" />
          </Box>
        ) : (
          <BarChart data={chartData} sx={financeStyles.chartContainer} />
        )}
      </Box>
    </Box>
  );
};
