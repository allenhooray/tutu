import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthToken } from './oauth-token.entity';
import { OAuthProvider } from '../../common/typeorm/enums';

@Injectable()
export class OAuthTokensService {
  constructor(
    @InjectRepository(OAuthToken)
    private oauthTokenRepository: Repository<OAuthToken>,
  ) {}

  async createToken({
    userId,
    provider,
    accessToken,
    refreshToken,
    expiresAt,
  }: {
    userId: string;
    provider: OAuthProvider;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
  }): Promise<OAuthToken> {
    const oauthToken = this.oauthTokenRepository.create({
      userId,
      provider,
      accessToken,
      refreshToken,
      expiresAt,
    });
    return this.oauthTokenRepository.save(oauthToken);
  }

  async getToken({
    userId,
    provider,
  }: {
    userId: string;
    provider: OAuthProvider;
  }): Promise<OAuthToken | null> {
    return this.oauthTokenRepository.findOneBy({
      userId,
      provider,
    });
  }

  async updateToken({
    userId,
    provider,
    accessToken,
    refreshToken,
    expiresAt,
  }: {
    userId: string;
    provider: OAuthProvider;
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
  }): Promise<void> {
    await this.oauthTokenRepository.update(
      { userId, provider },
      { accessToken, refreshToken, expiresAt },
    );
  }
}
