interface IProps {
  mode: 'password' | 'verification-code'
}

export const FooterPart = ({ mode }: IProps) => {
  if (mode === 'password') {
    return (
      <div className="text-center text-sm text-muted-foreground">
        还没有账号？{" "}
        <a href="#" className="underline underline-offset-4">
          注册
        </a>
      </div>
    )
  }
  return (
    <div className="text-center text-sm text-muted-foreground">
      若没有账号，则自动为您创建账号
    </div>
  )
}