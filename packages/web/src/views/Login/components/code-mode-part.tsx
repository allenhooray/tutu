import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type FC } from "react"

export const CodeFormPart: FC = () => {
  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="emailOrEmail">邮箱或手机号</Label>
        <Input id="emailOrEmail" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">
            验证码
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Input id="password" type="password" required />
          <Button>获取验证码</Button>
        </div>
      </div>
      <Button className="w-full gap-3">
        登录
      </Button>
    </>
  )
}