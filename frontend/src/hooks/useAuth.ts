import { useAppSelector } from "../app/hooks";

export const useAuth = () => {
  const { user, token, loading } = useAppSelector((state) => state.auth);

  return {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isManager: user?.role === "manager",
    isEmployee: user?.role === "employee",
  };
};
