import { Controller, Post, Body, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import {
  VerificationCodeProvider,
  OAuthProvider,
  User,
} from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
  ) {}

  @Post('login/password')
  async loginPassword(
    @Body()
    body: {
      username?: User['username'];
      email?: User['email'];
      phone?: User['phone'];
      password: string;
    },
  ) {
    const loginKey: string | undefined | null =
      body.username ?? body.email ?? body.phone;

    if (!loginKey) {
      throw new Error('请输入用户名、邮箱或手机号');
    }

    if (!body.password) {
      throw new Error('请输入密码');
    }

    return this.authService.loginWithPassword(loginKey, body.password);
  }

  @Post('login/verify')
  async loginVerification(
    @Body()
    body: {
      email?: User['email'];
      phone?: User['phone'];
      code: string;
    },
  ) {
    const target: string | undefined | null = body.email ?? body.phone;

    if (!target) {
      throw new Error('请输入邮箱或手机号');
    }

    if (!body.code) {
      throw new Error('请输入验证码');
    }

    const provider = body.email
      ? VerificationCodeProvider.EMAIL
      : VerificationCodeProvider.PHONE;

    return this.authService.loginWithVerificationCode({
      provider,
      target,
      code: body.code,
    });
  }

  @Post('oauth/:provider')
  loginOAuth(
    @Query('code') code: string,
    @Param('provider') provider: OAuthProvider,
  ) {
    return this.authService.loginWithOAuth({ provider, code });
  }
}
