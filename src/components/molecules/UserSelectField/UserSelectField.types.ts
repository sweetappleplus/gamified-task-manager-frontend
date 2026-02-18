import { User } from "types";

type UserSelectFieldBaseProps = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  width?: number | string;
  users: User[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onSearch: (query: string) => void;
};

export type UserSelectFieldSingleProps = UserSelectFieldBaseProps & {
  multiple?: false;
  value: User | null;
  onChange: (user: User | null) => void;
};

export type UserSelectFieldMultipleProps = UserSelectFieldBaseProps & {
  multiple: true;
  value: User[];
  onChange: (users: User[]) => void;
};

export type UserSelectFieldProps =
  | UserSelectFieldSingleProps
  | UserSelectFieldMultipleProps;
