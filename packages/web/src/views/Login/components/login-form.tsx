import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LarkIcon from "@/views/Login/assets/lark.svg?react"
import GoogleIcon from "@/views/Login/assets/google.svg?react"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Hi 👋</h1>
        <p className="text-muted-foreground text-sm text-balance">
          请输入您的邮箱登录
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">密码</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              忘记密码？
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
          登录
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            或者使用
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <LarkIcon />
          使用 飞书 登录
        </Button>
        <Button variant="outline" className="w-full">
          <GoogleIcon />
          使用 Google 登录
        </Button>
      </div>
      <div className="text-center text-sm">
        还没有账号？{" "}
        <a href="#" className="underline underline-offset-4">
          注册
        </a>
      </div>
    </form>
  )
}
