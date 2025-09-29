import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface ChangePasswordFormProps {
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  onCancel: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ onChangePassword, onCancel }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.currentPassword) {
      toast.error('请输入当前密码');
      return false;
    }

    if (!formData.newPassword) {
      toast.error('请输入新密码');
      return false;
    }

    if (formData.newPassword.length < 6) {
      toast.error('新密码长度至少为6位');
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('两次输入的新密码不一致');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onChangePassword(formData.currentPassword, formData.newPassword);
      toast.success('密码修改成功');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      onCancel();
    } catch (error) {
      toast.error('修改密码失败，请重试');
      console.error('Failed to change password:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>修改密码</CardTitle>
        <CardDescription>设置新密码以保护您的账户安全</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">当前密码</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              placeholder="请输入当前密码"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">新密码</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              placeholder="请输入新密码（至少6位）"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认新密码</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="请再次输入新密码"
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              取消
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '修改中...' : '确认修改'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};