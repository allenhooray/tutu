import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export const BookQueryView = () => {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 处理ISBN输入变化
  const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(e.target.value);
    setError('');
  };

  // 处理查询按钮点击
  const handleSearch = () => {
    // ISBN验证
    if (!isbn) {
      setError('请输入 ISBN 码');
      return;
    }

    if (!/^\d{10,13}$/.test(isbn)) {
      setError('ISBN 码应为 10-13 位数字');
      return;
    }

    // 清除错误信息
    setError('');

    // 假设ISBN就是图书ID
    navigate(`/book/${isbn}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">
          图书查询
        </h1>

        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="isbn">
                ISBN 码
              </Label>
              <Input
                id="isbn"
                type="text"
                placeholder="请输入 ISBN 码"
                className="w-full"
                value={isbn}
                onChange={handleIsbnChange}
              />
              {error && (
                <p className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>

            <Button onClick={handleSearch} className="w-full">
              查询
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};