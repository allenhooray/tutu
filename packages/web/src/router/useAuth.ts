import { useContext } from 'react';
import type { AuthContextType } from '@/context';
import { AuthContext } from '@/context';

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