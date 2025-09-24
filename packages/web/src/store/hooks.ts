import { useUserStore } from './user';

/**
 * 获取当前用户信息
 */
export const useCurrentUser = () => {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  
  return {
    user,
    isAuthenticated,
    isLoggedIn: isAuthenticated && !!user
  };
};

/**
 * 获取认证操作方法
 */
export const useAuthActions = () => {
  const { login, logout, updateUser } = useUserStore();
  
  return {
    login,
    logout,
    updateUser
  };
};

/**
 * 统一的认证钩子，类似于之前的 useAuth，但使用 zustand store
 */
export const useAuth = () => {
  const { user, isAuthenticated } = useCurrentUser();
  const { login, logout } = useAuthActions();
  
  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};

/**
 * 检查用户是否已认证的钩子，可用于路由守卫
 */
export const useRequireAuth = () => {
  const { isAuthenticated, user } = useCurrentUser();
  
  return {
    isAuthenticated,
    user,
    isAuthorized: isAuthenticated && !!user
  };
};