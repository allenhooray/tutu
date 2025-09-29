import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/user';
import { api } from '@/api';
import { toast } from 'sonner';
import type { User } from '@/store/user';

interface UseUserInfoReturn {
  user: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  updateUser: (userData: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

export const useUserInfo = (): UseUserInfoReturn => {
  const { user: storeUser, updateUser: storeUpdateUser, fetchUser } = useUserStore();
  const [user, setUser] = useState<User | null>(storeUser);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 同步 store 中的用户信息
  useEffect(() => {
    setUser(storeUser);
  }, [storeUser]);

  // 刷新用户信息
  const refreshUser = async () => {
    setIsLoading(true);
    try {
      await fetchUser();
    } catch (error) {
      console.error('Failed to refresh user:', error);
      toast.error('刷新用户信息失败');
    } finally {
      setIsLoading(false);
    }
  };

  // 更新用户信息
  const updateUser = async (userData: Partial<User>) => {
    setIsUpdating(true);
    try {
      // 调用 API 更新用户信息
      // 注意：由于当前 API 没有直接的更新用户信息接口，这里暂时只更新本地状态
      // 实际项目中需要调用真实的 API 接口
      storeUpdateUser(userData);
      
      // 这里可以添加实际的 API 调用
      // const response = await api.users.updateUser(user.id, userData);
      // if (response.data) {
      //   storeUpdateUser(response.data);
      // }
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  // 修改密码
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsUpdating(true);
    try {
      // 注意：由于当前 API 没有直接的修改密码接口，这里暂时只模拟成功
      // 实际项目中需要调用真实的 API 接口
      
      // 这里可以添加实际的 API 调用
      // await api.auth.changePassword({
      //   currentPassword,
      //   newPassword
      // });
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    user,
    isLoading,
    isUpdating,
    updateUser,
    refreshUser,
    changePassword
  };
};