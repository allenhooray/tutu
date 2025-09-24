import { api } from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useMemo, useState, type FC } from "react"
import { toast } from "sonner"
import isEmail from 'validator/es/lib/isEmail';
import isMobilePhone from 'validator/es/lib/isMobilePhone';

export const CodeFormPart: FC = () => {
  const [loginKey, setLoginkey] = useState('')
  const [code, setCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  const validateLoginKey = useMemo(() => {
    return isEmail(loginKey) || isMobilePhone(loginKey, 'zh-CN');
  }, [loginKey])

  const sendCodeBtnDisabled = useMemo(() => {
    return countdown > 0 || !validateLoginKey
  }, [countdown, validateLoginKey])

  const loginBtnDisabled = useMemo(() => {
    return !validateLoginKey || !code
  }, [validateLoginKey, code])

  const handleGetCode = async () => {
    if (!validateLoginKey) {
      toast.error('请输入正确的邮箱或手机号')
      return;
    }
    if (countdown > 0) {
      toast.error('请稍后再获取')
      return;
    }
    setCountdown(60)

    const isMail = isEmail(loginKey)
    await api.auth.senCode({
      email: isMail ? loginKey : undefined,
      phone: isMail ? undefined : loginKey,
    })
    toast.success('验证码发送成功')
  }

  const handleLogin = async () => {
    if (!validateLoginKey) {
      toast.error('请输入正确的邮箱或手机号')
      return;
    }
    if (!code) {
      toast.error('请输入验证码')
      return;
    }
    const isMail = isEmail(loginKey)
    await api.auth.loginVerification({
      email: isMail ? loginKey : undefined,
      phone: isMail ? undefined : loginKey,
      code,
    })
    toast.success('登录成功')
  }

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  return (
    <>
      <div className="grid gap-3">
        <Label htmlFor="emailOrEmail">邮箱或手机号</Label>
        <Input id="emailOrEmail" placeholder="m@example.com" type="email" required value={loginKey} onChange={(e) => setLoginkey(e.target.value)} />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">
            验证码
          </Label>
        </div>
        <div className="flex items-center gap-3">
          <Input id="password" type="password" required value={code} onChange={(e) => setCode(e.target.value)} />
          <Button disabled={sendCodeBtnDisabled} onClick={handleGetCode}>
            {countdown > 0 ? `获取验证码(${countdown}s)` : '获取验证码'}
          </Button>
        </div>
      </div>
      <Button className="w-full gap-3" onClick={handleLogin} disabled={loginBtnDisabled}>
        登录
      </Button>
    </>
  )
}