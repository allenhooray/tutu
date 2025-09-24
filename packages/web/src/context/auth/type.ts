// 定义用户类型接口
export interface User {
  id: string;
  name: string;
  email: string;
  // 其他用户相关字段
}

// 定义认证上下文类型接口
export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}