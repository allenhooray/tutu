import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/context';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

import { toast } from 'sonner';
import { Eye, EyeOff, Lock, MailIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  // 获取重定向的来源页面，如果没有则默认返回首页
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || '/';

  // 已登录，重定向到指定页面
  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }


  // 处理登录表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 简单的表单验证
    if (!email || !password) {
      toast.error('请填写所有必填字段');
      return;
    }

    // 这里是模拟登录，实际项目中应该调用API进行认证
    // 在真实环境中，这里应该是一个异步请求
    setTimeout(() => {
      try {
        // 模拟登录成功，创建一个用户对象
        const user = {
          id: '1',
          name: '示例用户',
          email: email
        };

        // 调用auth context的login方法
        login(user);

        // 登录成功后重定向到来源页面
        navigate(from, { replace: true });
      } catch (error) {
        console.error('登录失败:', error);
        toast.error('登录失败，请检查您的邮箱和密码');
      }
    }, 500);
  };

  return (
    <Card className="w-full max-w-md space-y-4 border-2 border-border/20">
      <CardHeader className="text-center space-y-1 pb-2">
        <CardTitle className="text-2xl font-bold">欢迎回来</CardTitle>
        <CardDescription>
          登录您的账号以继续使用 Tutu Web
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              邮箱
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MailIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="请输入您的邮箱"
                className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              密码
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入您的密码"
                className="pl-10 pr-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full h-10 gap-2">
            登录
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-center text-center text-xs text-muted-foreground space-y-2 pt-0">
        <p>
          继续即表示您同意我们的{' '}
          <a href="#" className="text-primary hover:underline">
            服务条款
          </a>{' '}
          和{' '}
          <a href="#" className="text-primary hover:underline">
            隐私政策
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;