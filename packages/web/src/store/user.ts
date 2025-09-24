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
      }
    }),
    {
      name: 'tutu-user-storage', // 本地存储的键名
      
      // 自定义持久化行为
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);