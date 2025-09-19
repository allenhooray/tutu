import { Injectable } from '@nestjs/common';
import { OAuthProvider } from 'generated/prisma';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OAuthTokensService {
  constructor(private prisma: PrismaService) {}

  async createToken(userId: string, provider: OAuthProvider, data: any) {
    return this.prisma.oAuthToken.create({
      data: {
        userId,
        provider,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        scope: data.scope,
        expiresAt: data.expires_at,
      },
    });
  }

  async getToken(userId: string, provider: OAuthProvider) {
    return this.prisma.oAuthToken.findFirst({
      where: { userId, provider },
    });
  }

  async updateToken(id: string, data: any) {
    return this.prisma.oAuthToken.update({
      where: { id },
      data: {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        scope: data.scope,
        expiresAt: data.expires_at,
      },
    });
  }
}
