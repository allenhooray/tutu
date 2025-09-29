import { api } from '@/api';
import { LOCAL_STORAGE_KEYS } from '@/constants/storages';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 定义用户类型接口
interface User {
  id: string;
  name: string;
  email: string;
  // 其他用户相关字段
}

// 定义用户存储状态接口
interface UserState {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  fetchUser: () => Promise<void>;
}

// 创建用户存储
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,

      // 登录方法
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true
        });
      },

      // 登出方法
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },

      // 更新用户信息方法
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },

      fetchUser: async () => {
        try {
          const resp = await api.users.getCurrentUser();
          // 检查resp.data是否包含User接口所需的字段
          if (resp.data && 'id' in resp.data && 'name' in resp.data && 'email' in resp.data) {
            set({
              user: resp.data as User,
              isAuthenticated: true
            });
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER, // 本地存储的键名
      // 自定义持久化行为
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

useUserStore.getState().fetchUser();
