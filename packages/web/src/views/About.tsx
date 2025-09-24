import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import NavigationMenu from '../components/NavigationMenu';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">关于我们</CardTitle>
            <CardDescription>
              了解我们的项目和愿景
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                这是一个示例应用，用于展示 React Router 的基本使用方法以及现代化 UI 设计。
              </p>
              <p className="text-muted-foreground">
                我们的目标是创建一个既美观又实用的 Web 应用，为用户提供流畅的体验。
              </p>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Link to="/">
              <Button variant="default" className="gap-2">
                返回首页
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default About;