import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './auth-types';

/**
 * 自定义钩子，方便使用认证上下文
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用');
  }
  return context as AuthContextType;
};