import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type FC } from "react"
import { toast } from "sonner"

interface IProps {
  mode: 'password' | 'verification-code'
}

export const FormPart: FC<IProps> = ({
  mode,
}) => {
  const handleClickForgotPassword = () => {
    toast('忘记密码实现中', {
      description: '敬请期待',
    })
  }

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">密码</Label>
          {
            mode === 'password' && (
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
                onClick={handleClickForgotPassword}
              >
                忘记密码？
              </a>
            )
          }
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full gap-3">
        登录
      </Button></>
  )
}