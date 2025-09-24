import { Controller, Post, Body, Query, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import { User } from '../users/user.entity';
import {
  OAuthProvider,
  VerificationCodeProvider,
} from '../../common/typeorm/enums';
import { VerificationCodesService } from '../verification-codes/verification-codes.service';
import {
  LoginCodeSendCodeDto,
  LoginCodeSendCodeResponseDto,
  LoginCodeVerifyDto,
  LoginPasswordDto,
} from './auth.dto';
import { ApiResponse } from 'src/common/decorators/api-response';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { HEADERS } from 'src/constants/headers';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private verificationCodesService: VerificationCodesService,
  ) {}

  @Post('login/password')
  async loginPassword(
    @Body()
    body: LoginPasswordDto,
    @Res() res: Response,
  ) {
    const loginKey: string | undefined | null =
      body.username ?? body.email ?? body.phone;

    if (!loginKey) {
      throw new Error('请输入用户名、邮箱或手机号');
    }

    if (!body.password) {
      throw new Error('请输入密码');
    }

    const result = await this.authService.loginWithPassword(
      loginKey,
      body.password,
    );
    // 在响应头中添加JWT
    res.header('Access-Control-Expose-Headers', HEADERS.AUTHORIZATION);
    res.header(HEADERS.AUTHORIZATION, `Bearer ${result.token}`);
    res.json({
      user: result.user,
    });
  }

  @Post('login/send-code')
  @ApiResponse(LoginCodeSendCodeResponseDto)
  async senCode(@Body() body: LoginCodeSendCodeDto) {
    console.log('senCode', JSON.stringify(body));
    const { email, phone } = body;
    if (!email && !phone) {
      throw new Error('请输入邮箱或手机号');
    }

    if (phone) {
      throw new Error('手机号登录暂未开放');
    }

    const target = email as string;
    const provider = VerificationCodeProvider.EMAIL;

    return await this.verificationCodesService.generateCode({
      provider,
      target,
    });
  }

  @Post('login/verify')
  async loginVerification(
    @Body()
    body: LoginCodeVerifyDto,
    @Res() res: Response,
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

    const result = await this.authService.loginWithVerificationCode({
      provider,
      target,
      code: body.code,
    });
    // 在响应头中添加JWT
    res.header('Access-Control-Expose-Headers', HEADERS.AUTHORIZATION);
    res.header(HEADERS.AUTHORIZATION, `Bearer ${result.token}`);
    res.json({
      user: result.user,
    });
  }

  @Post('oauth/:provider')
  @ApiOperation({ summary: 'OAuth登录' })
  async loginOAuth(
    @Query('code') code: string,
    @Param('provider') provider: OAuthProvider,
    @Res() res: Response,
  ) {
    const result = await this.authService.loginWithOAuth({ provider, code });
    // 在响应头中添加JWT
    res.header('Access-Control-Expose-Headers', HEADERS.AUTHORIZATION);
    res.header(HEADERS.AUTHORIZATION, `Bearer ${result.token}`);
    res.json({
      user: result.user,
    });
  }
}
