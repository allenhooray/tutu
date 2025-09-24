import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context';

/**
 * 公共路由组件
 * 当用户已登录时，重定向到指定页面（默认首页）
 * 当用户未登录时，渲染登录/注册等页面
 */
export const PublicRoute: React.FC<{ redirectTo?: string }> = ({ redirectTo = '/' }) => {
  const { isAuthenticated } = useAuth();

  // 已登录，重定向到指定页面
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  // 未登录，渲染子路由
  return <Outlet />;
};