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