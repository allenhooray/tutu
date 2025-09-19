import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthService {
  async getOAuthUrl(provider: string) {
    // TODO: 返回第三方 OAuth 登录 URL
  }

  async getToken(provider: string, code: string) {
    // TODO: 使用 code 获取 access_token / refresh_token
  }

  async getUserInfo(provider: string, accessToken: string) {
    // TODO: 获取用户信息
  }
}
