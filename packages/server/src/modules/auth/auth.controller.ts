import { Controller, Post, Body, Query, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import { VerificationCodeProvider, OAuthProvider } from 'generated/prisma';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
  ) {}

  @Post('login/password')
  async loginPassword(@Body() body: { email: string; password: string }) {
    return this.authService.loginWithPassword(body.email, body.password);
  }

  @Post('oauth/:provider')
  async loginOAuth(
    @Query('code') code: string,
    @Param('provider') provider: OAuthProvider,
  ) {
    return this.authService.loginWithOAuth(provider, code);
  }

  @Post('verify')
  async loginVerification(
    @Body()
    body: {
      provider: VerificationCodeProvider;
      target: string;
      code: string;
    },
  ) {
    return this.authService.loginWithVerificationCode(
      body.provider,
      body.target,
      body.code,
    );
  }
}
