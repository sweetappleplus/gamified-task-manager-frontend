import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, FilterUsersParams } from "types";

type UserState = {
  users: User[];
  total: number;
  isLoading: boolean;
  filters: FilterUsersParams;
};

const initialState: UserState = {
  users: [],
  total: 0,
  isLoading: false,
  filters: { page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterUsersParams>) => {
      state.filters = action.payload;
    },
    updateUserInList: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { setUsers, setTotal, setLoading, setFilters, updateUserInList } =
  userSlice.actions;

export default userSlice.reducer;
