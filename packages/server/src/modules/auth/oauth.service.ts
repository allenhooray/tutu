import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

interface TokenData {
  accessToken: string;
  refreshToken?: string;
}

@Injectable()
export class OAuthService {
  async getOAuthUrl(provider: string) {
    // TODO: 返回第三方 OAuth 登录 URL
  }

  async getToken(provider: string, code: string): Promise<TokenData> {
    // TODO: 使用 code 获取 access_token / refresh_token
    return { accessToken: 'accessToken' };
  }

  async getUserInfo(provider: string, accessToken: string): Promise<User> {
    // TODO: 获取用户信息
    return {
      id: 'id',
      name: 'name',
      email: 'email',
      avatarUrl: 'avatarUrl',
      createdAt: new Date(),
    };
  }
}
