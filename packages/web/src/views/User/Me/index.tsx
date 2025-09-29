import React, { useState } from 'react';
import { useUserInfo } from './hooks/useUserInfo';
import { UserInfoSection } from './components/UserInfoSection';
import { EditUserForm } from './components/EditUserForm';
import { ChangePasswordForm } from './components/ChangePasswordForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// 定义页面状态枚举
enum PageMode {
  VIEW = 'view',
  EDIT_INFO = 'edit_info',
  CHANGE_PASSWORD = 'change_password'
}

export const UserMeView: React.FC = () => {
  const { user, isLoading, isUpdating, updateUser, refreshUser, changePassword } = useUserInfo();
  const [pageMode, setPageMode] = useState<PageMode>(PageMode.VIEW);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 刷新用户信息
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshUser();
    setIsRefreshing(false);
  };

  // 处理编辑用户信息
  const handleEditInfo = async (userData: Partial<any>) => {
    await updateUser(userData);
    setPageMode(PageMode.VIEW);
  };

  // 处理修改密码
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    await changePassword(currentPassword, newPassword);
    setPageMode(PageMode.VIEW);
  };

  // 处理取消编辑
  const handleCancel = () => {
    setPageMode(PageMode.VIEW);
  };

  // 处理登出
  const handleLogout = () => {
    try {
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to logout:', error);
      toast.error('登出失败，请重试');
    }
  };

  // 渲染页面内容
  const renderContent = () => {
    switch (pageMode) {
      case PageMode.EDIT_INFO:
        return user ? (
          <EditUserForm
            user={user}
            onSave={handleEditInfo}
            onCancel={handleCancel}
          />
        ) : null;

      case PageMode.CHANGE_PASSWORD:
        return (
          <ChangePasswordForm
            onChangePassword={handleChangePassword}
            onCancel={handleCancel}
          />
        );

      case PageMode.VIEW:
      default:
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">账户设置</h2>
              <Button
                variant="ghost"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
              >
                {isRefreshing ? '刷新中...' : '刷新'}
              </Button>
            </div>

            <div className="space-y-6">
              <UserInfoSection
                user={user}
                onEditPress={() => setPageMode(PageMode.EDIT_INFO)}
              />

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>账户安全</CardTitle>
                  <CardDescription>管理您的账户安全设置</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">修改密码</h4>
                        <p className="text-sm text-muted-foreground">定期更改密码以保护账户安全</p>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setPageMode(PageMode.CHANGE_PASSWORD)}
                      >
                        修改
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">两因素认证</h4>
                        <p className="text-sm text-muted-foreground">提高账户安全性</p>
                      </div>
                      <Badge variant="outline">未启用</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>账户管理</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        登出账户
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>确认登出</AlertDialogTitle>
                        <AlertDialogDescription>
                          您确定要登出当前账户吗？登出后需要重新登录才能访问您的账户。
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          确认登出
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        {isLoading && !user ? (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-muted-foreground">加载中...</p>
          </div>
        ) : renderContent()}
      </ScrollArea>
    </div>
  );
};