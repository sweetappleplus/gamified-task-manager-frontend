import { SxProps, Theme } from "@mui/material";

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  width?: number | string;
  sx?: SxProps<Theme>;
}
