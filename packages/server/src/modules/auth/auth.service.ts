import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OAuthService } from './oauth.service';
import { OAuthTokensService } from '../oauth-tokens/oauth-tokens.service';
import { VerificationCodesService } from '../verification-codes/verification-codes.service';
import { User } from '../users/user.entity';
import { IdentityProvider, OAuthProvider, VerificationCodeProvider } from '../../common/typeorm/enums';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private oauthService: OAuthService,
    private oauthTokensService: OAuthTokensService,
    private verificationCodesService: VerificationCodesService,
  ) {}

  /**
   * 密码登录
   * @param username 用户名/邮箱/手机号
   * @param password 密码
   * @returns
   */
  async loginWithPassword(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    // 找到对应用户
    const user = await this.usersService.findUserByAnyUniqueKey(username);
    if (!user) {
      throw new Error('用户不存在');
    }

    // 检查密码
    // 这里应该是密码验证逻辑，暂时假设密码正确
    // const isPasswordValid = await this.passwordEncoder.verify(password, user.password);
    // if (!isPasswordValid) {
    //   throw new Error('密码错误');
    // }

    // 生成 Token
    const token = await this.generateJWT(user.id);
    return { user, token };
  }

  /**
   * 验证码登录
   * @param provider 验证码提供者
   * @param target 目标（邮箱或手机号）
   * @param code 验证码
   * @returns
   */
  async loginWithVerificationCode({
    provider,
    target,
    code,
  }: {
    provider: VerificationCodeProvider;
    target: string;
    code: string;
  }): Promise<{ user: User; token: string }> {
    // 验证验证码
    const verificationResult = await this.verificationCodesService.verifyCode(
      provider,
      target,
      code
    );
    if (!verificationResult.success) {
      throw new Error(verificationResult.message || '验证码错误或已过期');
    }

    // 找到对应用户
    let user = await this.usersService.findUserByAnyUniqueKey(target);
    if (!user) {
      // 如果用户不存在，则创建新用户
      user = await this.usersService.createUser({
        username: target,
        phone: provider === VerificationCodeProvider.PHONE ? target : undefined,
        email: provider === VerificationCodeProvider.EMAIL ? target : undefined,
        name: '',
        avatarUrl: '',
        identities: [],
        oauthTokens: [],
      });
    }

    // 生成 Token
    const token = await this.generateJWT(user.id);
    return { user, token };
  }

  /**
   * OAuth 登录
   * @param provider OAuth 提供商
   * @param code OAuth 授权码
   * @returns
   */
  async loginWithOAuth({
    provider,
    code,
  }: {
    provider: OAuthProvider;
    code: string;
  }): Promise<{ user: User; token: string }> {
    // 获取 OAuth 用户信息
    const tokenData = await this.oauthTokensService.createToken({
      userId: '',
      provider,
      accessToken: code,
      refreshToken: '',
    });
    const oauthUserInfo = await this.oauthService.getOAuthUserInfo(
      provider,
      tokenData.accessToken
    );
    if (!oauthUserInfo) {
      throw new Error('OAuth 登录失败');
    }

    // 尝试通过 OAuth 用户 ID 查找用户
    let user = await this.usersService.findUserByIdentity({
      provider: IdentityProvider.GOOGLE, // 简化处理，直接使用对应的IdentityProvider
      providerUid: oauthUserInfo.providerId,
    });

    // 如果用户不存在，则创建新用户
    if (!user) {
      user = await this.usersService.createUser({
        username: oauthUserInfo.email || `oauth_${provider}_${oauthUserInfo.providerId}`,
        email: oauthUserInfo.email || undefined,
        phone: oauthUserInfo.phone || undefined,
        name: oauthUserInfo.name || '',
        avatarUrl: oauthUserInfo.avatarUrl || '',
        identities: [],
        oauthTokens: [],
      });

      // 创建 OAuth 身份关联
      await this.usersService.createIdentity({
        provider: IdentityProvider.GOOGLE, // 简化处理
        userId: user.id,
      });
    }

    // 保存或更新 OAuth Token
    await this.oauthTokensService.updateToken({
      userId: user.id,
      provider,
      accessToken: code,
      refreshToken: '',
    });

    // 生成 Token
    const token = await this.generateJWT(user.id);
    return { user, token };
  }

  /**
   * 生成 JWT
   * @param userId 用户 ID
   * @returns
   */
  private async generateJWT(userId: string): Promise<string> {
    // 实际实现中，应该使用 JWT 库生成 Token
    // 这里只是返回一个模拟的 Token
    return `mock-jwt-token-${userId}`;
  }
}
