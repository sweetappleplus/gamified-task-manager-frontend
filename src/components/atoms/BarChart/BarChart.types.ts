import { SxProps, Theme } from "@mui/material";

export interface BarChartDataItem {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDataItem[];
  sx?: SxProps<Theme>;
}
