import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OAuthService } from './oauth.service';
import { OAuthTokensService } from '../oauth-tokens/oauth-tokens.service';
import { VerificationCodesService } from '../verification-codes/verification-codes.service';
import {
  OAuthProvider,
  VerificationCodeProvider,
  IdentityProvider,
  User,
} from 'generated/prisma';
import { generateSemanticUsername } from 'src/common/utils/generate-semantic-username';

const DEFAULT_AVATAR_URL = '';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private oauthService: OAuthService,
    private oauthTokensService: OAuthTokensService,
    private verificationCodesService: VerificationCodesService,
  ) {}

  async loginWithPassword(loginKey: string, password: string) {
    const user = await this.usersService.findUserByAnyUniqueKey(loginKey);
    if (!user) {
      throw new Error('用户不存在');
    }
    const identity = await this.usersService.findIdentity({
      provider: IdentityProvider.PASSWORD,
      userId: user.id,
    });
    if (!identity) {
      throw new Error('用户不存在');
    }
    if (identity.credential !== password) {
      throw new Error('密码错误');
    }
    return this.generateJWT(user);
  }

  async loginWithVerificationCode({
    provider,
    target,
    code,
  }: {
    provider: VerificationCodeProvider;
    // email or phone
    target: string;
    code: string;
  }) {
    const valid = await this.verificationCodesService.verifyCode(
      provider,
      target,
      code,
    );
    if (!valid.success) {
      throw new Error('验证码无效');
    }

    // 查找或创建用户
    const user = await this.usersService.findUserByAnyUniqueKey(target);
    if (user) {
      return this.generateJWT(user);
    } else {
      const username = generateSemanticUsername(target);
      const phone = provider === VerificationCodeProvider.PHONE ? target : null;
      const email = provider === VerificationCodeProvider.EMAIL ? target : null;

      const newUser = await this.usersService.createUser({
        name: 'New User',
        username,
        email,
        phone,
        avatarUrl: DEFAULT_AVATAR_URL,
      });
      await this.usersService.createIdentity({
        provider,
        userId: newUser.id,
      });
      return this.generateJWT(newUser);
    }
  }

  // async loginWithOAuth(provider: OAuthProvider, code: string) {
  //   const tokenData = await this.oauthService.getToken(provider, code);
  //   const userInfo = await this.oauthService.getUserInfo(
  //     provider,
  //     tokenData.accessToken,
  //   );

  //   // 查找或创建用户
  //   let user = await this.usersService.findIdentity(provider, pus);
  //   if (!user) {
  //     user = await this.usersService.createUser({
  //       name: userInfo.name,
  //       email: userInfo.email ?? undefined,
  //       avatarUrl: userInfo.avatarUrl ?? undefined,
  //     });
  //     await this.usersService.createIdentity(provider, user.id, userInfo.id);
  //   }

  //   // 保存 OAuth token
  //   await this.oauthTokensService.createToken(user.id, provider, tokenData);

  //   // 返回 JWT 或 session
  //   return this.generateJWT(user);
  // }

  private generateJWT(user: User) {
    // TODO: 签发 JWT
    return { access_token: 'fake-jwt', user };
  }
}
