import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import {
  setUsers,
  setTotal,
  setLoading,
  setFilters,
  updateUserInList,
} from "./slice";
import { getUsersApi, updateUserStatusApi } from "services";
import { FilterUsersParams } from "types";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.user.users);
  const total = useAppSelector((state: RootState) => state.user.total);
  const isLoading = useAppSelector((state: RootState) => state.user.isLoading);
  const filters = useAppSelector((state: RootState) => state.user.filters);

  const fetchUsers = useCallback(
    async (params?: FilterUsersParams) => {
      const queryParams = params ?? filters;
      dispatch(setLoading(true));
      try {
        const response = await getUsersApi(queryParams);
        if (response.data) {
          dispatch(setUsers(response.data));
        }
        if (response.pagination) {
          dispatch(setTotal(response.pagination.total));
        }
        return response;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, filters]
  );

  const toggleUserStatus = useCallback(
    async (id: string, isActive: boolean) => {
      const response = await updateUserStatusApi(id, isActive);
      if (response.data) {
        dispatch(updateUserInList(response.data));
      }
      return response;
    },
    [dispatch]
  );

  const changeFilters = useCallback(
    (newFilters: FilterUsersParams) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  return {
    users,
    total,
    isLoading,
    filters,
    fetchUsers,
    toggleUserStatus,
    changeFilters,
  };
};
