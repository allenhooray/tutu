import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

// 受保护路由组件接口
interface PrivateRouteProps {
  // 可以添加额外的权限检查属性
  allowedRoles?: string[];
}

/**
 * 受保护的路由组件
 * 当用户未登录时，重定向到登录页面
 * 当用户已登录时，渲染子路由
 */
export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // 未登录，重定向到登录页面，并记录当前位置以便登录后返回
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 已登录，检查角色权限（如果有指定）
  // 注意：当前User接口中没有role字段，需要根据实际情况添加
  if (allowedRoles && false) {
    // 无权限，重定向到无权限页面（这里简化处理，直接返回首页）
    return <Navigate to="/" replace />
  }

  // 已登录且有权限，渲染子路由
  return <Outlet />;
};

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