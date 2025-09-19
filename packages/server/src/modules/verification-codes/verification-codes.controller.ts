import { Controller, Post, Body } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { VerificationCodeProvider } from 'generated/prisma';

@Controller('verification-codes')
export class VerificationCodesController {
  constructor(private verificationCodesService: VerificationCodesService) {}

  // 生成验证码（发送到手机号/邮箱）
  @Post('generate')
  async generate(
    @Body() body: { provider: VerificationCodeProvider; target: string },
  ) {
    return this.verificationCodesService.generateCode(
      body.provider,
      body.target,
    );
  }

  // 验证用户输入的验证码
  @Post('verify')
  async verify(
    @Body()
    body: {
      provider: VerificationCodeProvider;
      target: string;
      code: string;
    },
  ) {
    return this.verificationCodesService.verifyCode(
      body.provider,
      body.target,
      body.code,
    );
  }
}
