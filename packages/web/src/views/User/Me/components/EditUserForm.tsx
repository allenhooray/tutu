import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import type { User } from '@/store/user';

interface EditUserFormProps {
  user: User;
  onSave: (data: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('姓名不能为空');
      return;
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData);
      toast.success('用户信息更新成功');
    } catch (error) {
      toast.error('更新用户信息失败，请重试');
      console.error('Failed to update user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>编辑个人信息</CardTitle>
        <CardDescription>修改您的基本信息</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="请输入您的姓名"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="请输入您的邮箱地址"
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存更改'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};