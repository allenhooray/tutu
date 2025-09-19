import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { addMinutes, isBefore } from 'date-fns';
import { VerificationCodeProvider } from 'generated/prisma';

@Injectable()
export class VerificationCodesService {
  constructor(private prisma: PrismaService) {}

  // 生成验证码
  async generateCode(provider: VerificationCodeProvider, target: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6位随机码
    const expiresAt = addMinutes(new Date(), 5); // 5分钟有效

    await this.prisma.verificationCode.create({
      data: { provider, target, code, expiresAt },
    });

    // TODO: 调用短信/邮箱服务发送 code
    return { success: true };
  }

  // 验证用户输入的验证码
  async verifyCode(
    provider: VerificationCodeProvider,
    target: string,
    code: string,
  ) {
    const record = await this.prisma.verificationCode.findUnique({
      where: { provider_target_code: { provider, target, code } },
    });

    if (!record || isBefore(record.expiresAt, new Date())) {
      return { success: false, message: '验证码无效或已过期' };
    }

    // 验证成功后删除或标记已使用
    await this.prisma.verificationCode.delete({ where: { id: record.id } });

    return { success: true };
  }
}
