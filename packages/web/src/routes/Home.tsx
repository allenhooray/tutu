import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import NavigationMenu from '../components/NavigationMenu';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationMenu />

      {/* 主要内容 */}
      <main className="flex-1 container px-4 py-8 md:px-6 md:py-12">
        <Card className="mx-auto max-w-3xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">欢迎来到 Tutu Web</CardTitle>
            <CardDescription>
              这是一个使用 React 和 Vite 构建的 Web 应用
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              <p className="text-center text-muted-foreground">
                探索应用的功能，体验现代化的 UI 设计
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 pt-2">
            <Link to="/about">
              <Button variant="default">关于我们</Button>
            </Link>
            <Link to="/non-existent-route">
              <Button variant="secondary">测试404</Button>
            </Link>
          </CardFooter>
        </Card>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} Tutu Web. 保留所有权利。
        </div>
      </footer>
    </div>
  );
};

export default Home;