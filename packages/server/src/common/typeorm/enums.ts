// 登录方式枚举
export enum IdentityProvider {
  PASSWORD = 'PASSWORD',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
  FEISHU = 'FEISHU',
}

// OAuth 提供者枚举
export enum OAuthProvider {
  GOOGLE = 'GOOGLE',
  FEISHU = 'FEISHU',
}

// 验证码提供者枚举
export enum VerificationCodeProvider {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}