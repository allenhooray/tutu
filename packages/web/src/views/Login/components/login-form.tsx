import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState, type FC } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OAuthPart } from "./oauth-part"

interface IProps {
  className?: string
}


export const LoginForm: FC<IProps> = ({
  className,
}) => {
  // 登录方式
  const [tab, setTab] = useState<'password' | 'verification-code'>('verification-code')
  const handleChangeTab = (value: string) => {
    setTab(value as 'password' | 'verification-code')
  }

  const handleClickForgotPassword = () => {
    toast('忘记密码实现中', {
      description: '敬请期待',
    })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Tabs value={tab} onValueChange={handleChangeTab} >
        <TabsList className="w-full" >
          <TabsTrigger value="verification-code">使用验证码登录</TabsTrigger>
          <TabsTrigger value="password">使用密码登录</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        <div className="grid gap-3">
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
                onClick={handleClickForgotPassword}
              >
                忘记密码？
              </a>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full gap-3">
            登录
          </Button>

          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              或者使用
            </span>
          </div>
          <OAuthPart />
        </div>
        <div className="text-center text-sm">
          还没有账号？{" "}
          <a href="#" className="underline underline-offset-4">
            注册
          </a>
        </div>
      </div >
    </div>
  )
}
