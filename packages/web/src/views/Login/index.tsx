import { GalleryVerticalEnd } from "lucide-react"
import { useLocation } from "react-router-dom";

import { LoginForm } from "./components/login-form"
import { useCheckLogin } from "./hooks/useCheckLogin"

export default function LoginPage() {
  const location = useLocation();

  // 获取重定向的来源页面，如果没有则默认返回首页
  const from = (location.state as { from: { pathname: string } })?.from?.pathname || '/';

  useCheckLogin({ from })

  return (
    <div className="grid min-h-svh w-full lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
