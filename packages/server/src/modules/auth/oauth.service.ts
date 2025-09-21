import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthService {
  async getOAuthUrl(provider: string) {
    // TODO: 返回第三方 OAuth 登录 URL
  }

  async getOAuthUserInfo(
    provider: string,
    accessToken: string,
  ): Promise<{
    providerId: string;
    name?: string;
    avatarUrl?: string;
    email?: string;
    phone?: string;
  }> {
    // TODO: 获取用户信息
    return {
      providerId: '',
      name: 'name',
      avatarUrl: 'avatarUrl',
      email: 'email',
      phone: 'phone',
    };
  }
}
