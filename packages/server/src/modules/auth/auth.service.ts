import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OAuthService } from './oauth.service';
import { OAuthTokensService } from '../oauth-tokens/oauth-tokens.service';
import { VerificationCodesService } from '../verification-codes/verification-codes.service';
import { OAuthProvider, VerificationCodeProvider } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private oauthService: OAuthService,
    private oauthTokensService: OAuthTokensService,
    private verificationCodesService: VerificationCodesService,
  ) {}

  async loginWithPassword(email: string, password: string) {
    // TODO
  }

  async loginWithOAuth(provider: OAuthProvider, code: string) {
    const tokenData = await this.oauthService.getToken(provider, code);
    const userInfo = await this.oauthService.getUserInfo(
      provider,
      tokenData.access_token,
    );

    // 查找或创建用户
    let user = await this.usersService.findByProvider(provider, userInfo.id);
    if (!user) {
      user = await this.usersService.createUser({
        name: userInfo.name,
        email: userInfo.email,
        avatarUrl: userInfo.avatar,
      });
      await this.usersService.createIdentity(user.id, provider, userInfo.id);
    }

    // 保存 OAuth token
    await this.oauthTokensService.createToken(user.id, provider, tokenData);

    // 返回 JWT 或 session
    return this.generateJWT(user);
  }

  async loginWithVerificationCode(
    provider: VerificationCodeProvider,
    target: string,
    code: string,
  ) {
    const valid = await this.verificationCodesService.verifyCode(
      provider,
      target,
      code,
    );
    if (!valid.success) throw new Error('验证码无效');

    // 查找或创建用户
    let user = await this.usersService.findByTarget(provider, target);
    if (!user) {
      user = await this.usersService.createUser({ name: target });
      await this.usersService.createIdentity(user.id, provider, target);
    }

    return this.generateJWT(user);
  }

  private generateJWT(user: any) {
    // TODO: 签发 JWT
    return { access_token: 'fake-jwt', user };
  }
}
