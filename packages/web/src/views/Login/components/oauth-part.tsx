import { Button } from "@/components/ui/button"
import LarkIcon from "@/views/Login/assets/lark.svg?react"
import GoogleIcon from "@/views/Login/assets/google.svg?react"
import { toast } from "sonner"
import { type FC } from "react"

export const OAuthPart: FC = () => {
  const handleClickOAuth = () => {
    toast('更多登录方式实现中', {
      description: '当前仅支持邮箱登录',
    })
  }

  return (
    <>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          或者
        </span>
      </div>
      <Button variant="outline" className="w-full" onClick={handleClickOAuth}>
        <LarkIcon />
        使用 飞书 登录
      </Button>
      <Button variant="outline" className="w-full" onClick={handleClickOAuth}>
        <GoogleIcon />
        使用 Google 登录
      </Button>
    </>
  )
}