import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser, logout } from "./slice";
import { RootState } from "@/app/store";
import { User } from "@/types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const login = (userData: User) => {
    dispatch(setUser(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    login,
    logout: handleLogout,
  };
};
