import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

// 定义表单数据类型
interface BookQueryFormData {
  isbn: string;
}

export const BookQueryView = () => {
  // 使用 React Hook Form 创建表单
  const form = useForm<BookQueryFormData>({
    defaultValues: {
      isbn: '',
    },
  });

  // 处理表单提交
  const handleSubmit = (data: BookQueryFormData) => {
    // 这里可以添加 ISBN 查询的逻辑
    console.log('Searching for ISBN:', data.isbn);
    // 实际应用中，这里会调用 API 进行 ISBN 查询
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 dark:from-background dark:to-background/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-center text-foreground mb-8">
          图书查询
        </h1>

        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="isbn">
                  ISBN 码
                </Label>
                <Input
                  id="isbn"
                  type="text"
                  placeholder="请输入 ISBN 码"
                  className="w-full"
                  {...form.register('isbn', {
                    required: '请输入 ISBN 码',
                    pattern: {
                      value: /^\d{10,13}$/,
                      message: 'ISBN 码应为 10-13 位数字',
                    },
                  })}
                />
                {form.formState.errors.isbn && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.isbn.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full">
                查询
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};