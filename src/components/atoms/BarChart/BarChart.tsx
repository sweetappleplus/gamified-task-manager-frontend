import React from "react";
import { Box, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Plugin,
  ChartData,
  ChartOptions,
} from "chart.js";
import { BarChartProps } from "./BarChart.types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const formatValue = (value: number): string => {
  if (value >= 1000) {
    const formatted = (value / 1000).toFixed(1);
    return formatted.endsWith(".0")
      ? `${Math.floor(value / 1000)}k`
      : `${formatted}k`;
  }
  return value.toString();
};

const hoverLabelPlugin: Plugin<"bar"> = {
  id: "hoverLabel",
  afterDraw(chart) {
    const activeElements = chart.getActiveElements();
    if (activeElements.length === 0) return;

    const { ctx } = chart;
    const element = activeElements[0];
    const meta = chart.getDatasetMeta(element.datasetIndex);
    const bar = meta.data[element.index];
    const value = chart.data.datasets[element.datasetIndex].data[
      element.index
    ] as number;

    ctx.save();
    ctx.font = "400 12px 'SF Pro Display', sans-serif";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(formatValue(value), bar.x, bar.y - 8);
    ctx.restore();
  },
};

export const BarChart: React.FC<BarChartProps> = ({ data, sx }) => {
  const theme = useTheme();

  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.value);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: theme.palette.primary[50],
        hoverBackgroundColor: theme.palette.primary.main,
        borderRadius: {
          topLeft: 8,
          topRight: 8,
          bottomRight: 4,
          bottomLeft: 4,
        },
        borderSkipped: false,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'SF Pro Display', sans-serif",
            size: 12,
            weight: 400,
            lineHeight: "16px",
          },
          color: theme.palette.grayscale[500],
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: theme.palette.grayscale[50],
        },
        border: {
          display: false,
          dash: [4, 4],
        },
        ticks: {
          font: {
            family: "'SF Pro Display', sans-serif",
            size: 12,
            weight: 400,
            lineHeight: "16px",
          },
          color: theme.palette.grayscale[500],
          callback: (value) => formatValue(value as number),
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    datasets: {
      bar: {
        categoryPercentage: 0.8,
        barPercentage: 0.85,
      },
    },
  };

  return (
    <Box sx={sx}>
      <Bar data={chartData} options={options} plugins={[hoverLabelPlugin]} />
    </Box>
  );
};
