import { Navigate } from 'react-router-dom';
import { useAuth } from "@/context";

export const useCheckLogin = ({ from }: { from: string }) => {
  const { isAuthenticated } = useAuth();

  // 已登录，重定向到指定页面
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }
}