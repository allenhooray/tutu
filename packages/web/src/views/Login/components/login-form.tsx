import { cn } from "@/lib/utils"
import { useState, type FC } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OAuthPart } from "./oauth-part"
import { FooterPart } from "./footer-part"
import { PasswordFormPart } from "./password-part"
import { CodeFormPart } from "./code-mode-part"

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
          {tab === 'password' ? <PasswordFormPart /> : <CodeFormPart />}
          <OAuthPart />
        </div>
        <FooterPart mode={tab} />
      </div >
    </div>
  )
}
