import { Injectable } from '@nestjs/common';
import { OAuthProvider } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';

export interface TokenData {
  accessToken: string;
  refreshToken: string;
  scope?: string;
  expiresAt: Date;
}

@Injectable()
export class OAuthTokensService {
  constructor(private prisma: PrismaService) {}

  /**
   * 从 OAuth 提供商获取令牌并保存到数据库
   * @param userId 用户ID
   * @param provider 第三方 OAuth 提供商
   * @param data 令牌数据
   * @returns
   */
  async createToken({
    provider,
    code,
  }: {
    userId: string;
    provider: OAuthProvider;
    code: string;
  }) {
    // TODO: 从 OAuth 提供商获取令牌
    const tokenData: TokenData = {
      accessToken: '',
      refreshToken: '',
      scope: '',
      expiresAt: new Date(),
    };
    return this.prisma.oAuthToken.create({
      data: {
        userId,
        provider,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        scope: tokenData.scope,
        expiresAt: tokenData.expiresAt,
      },
    });
  }

  /**
   * 从数据库获取用户的 OAuth 令牌
   * @param userId 用户ID
   * @param provider 第三方 OAuth 提供商
   * @returns
   */
  async getToken(userId: string, provider: OAuthProvider) {
    return this.prisma.oAuthToken.findUnique({
      where: { userId_provider: { userId, provider } },
    });
  }

  /**
   * 更新用户的 OAuth 令牌
   * @param id 令牌ID
   * @param data 令牌数据
   * @returns
   */
  async updateToken(id: string, data: TokenData) {
    return this.prisma.oAuthToken.update({
      where: { id },
      data: {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        scope: data.scope,
        expiresAt: data.expiresAt,
      },
    });
  }
}
