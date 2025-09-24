import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { AlertCircle, Home } from 'lucide-react';
import NavigationMenu from '../components/NavigationMenu';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationMenu />
      <main className="flex-1 container px-4 py-8 md:px-6 flex items-center justify-center">
        <Card className="w-full max-w-lg border-2 border-border/20">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <AlertCircle className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-bold">404</CardTitle>
            <CardDescription>
              页面未找到
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4 pt-2">
            <p className="text-muted-foreground">
              抱歉，您访问的页面不存在或已被移除。
            </p>
          </CardContent>
          <CardFooter className="justify-center space-y-2 pt-0">
            <Link to="/">
              <Button variant="default" className="gap-2">
                <Home className="h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default NotFound;