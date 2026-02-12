import { SxProps, Theme } from "@mui/material";
import { User } from "types";
import { LeafVariant } from "components";

export interface UserInfoProps {
  user: User;
  leafVariant: LeafVariant;
  leafText?: string;
  sx?: SxProps<Theme>;
}
