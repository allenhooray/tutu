import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 用户类型定义
export interface User {
  id: string;
  username: string;
  email?: string;
  phone?: string;
  name?: string;
  avatarUrl?: string;
  createdAt: string;
}

// 认证上下文类型
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 创建认证上下文
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: async () => { },
  logout: async () => { },
});

// 认证提供者组件，用于包裹整个应用
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化时检查用户认证状态
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
      }
    };

    initializeAuth();
  }, []);

  // 登录函数，保存用户信息和令牌到本地存储
  const login = async (userData: User, authToken: string) => {
    try {
      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);
      // 登录成功后导航到主页
      router.replace('/');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  };

  // 注销函数，清除本地存储的用户信息和令牌
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      // 注销成功后导航到登录页
      router.replace('/auth/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
    }
  };

  // 提供认证上下文值
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 自定义Hook，方便在组件中使用认证上下文
export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};