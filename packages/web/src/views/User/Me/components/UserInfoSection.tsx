import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUserStore } from '@/store/user';
import type { User } from '@/store/user';

interface UserInfoSectionProps {
  user: User | null;
  onEditPress: () => void;
}

export const UserInfoSection: React.FC<UserInfoSectionProps> = ({ user, onEditPress }) => {
  if (!user) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">加载用户信息中...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>个人信息</CardTitle>
        <CardDescription>查看和管理您的个人资料</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
            <AvatarFallback className="text-2xl">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-2xl font-bold">{user.name || '未设置姓名'}</h3>
            <p className="text-muted-foreground">{user.email || '未设置邮箱'}</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label className="text-right">用户ID</Label>
            <div className="col-span-2 font-mono text-sm bg-muted p-2 rounded">{user.id}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label className="text-right">注册时间</Label>
            <div className="col-span-2 text-sm text-muted-foreground">
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '未知'}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={onEditPress}>编辑信息</Button>
      </CardFooter>
    </Card>
  );
};