import { SxProps, Theme } from "@mui/material";

export interface TabItem {
  label: string;
  value: string;
}

export interface TabProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  sx?: SxProps<Theme>;
}
