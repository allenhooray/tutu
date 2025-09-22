import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes, isBefore } from 'date-fns';
import { VerificationCodeProvider } from '../../common/typeorm/enums';
import { MailService } from 'src/common/mail/mail.service';
import { VerificationCode } from './verification-code.entity';

@Injectable()
export class VerificationCodesService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodeRepository: Repository<VerificationCode>,
    private mailService: MailService,
  ) {}

  // 生成验证码
  async generateCode({
    provider,
    target,
  }: {
    provider: VerificationCodeProvider;
    target: string;
  }) {
    const EXPIRES_IN = 5;
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6位随机码
    const expiresAt = addMinutes(new Date(), EXPIRES_IN); // 5分钟有效

    const verificationCode = this.verificationCodeRepository.create({
      provider,
      target,
      code,
      expiresAt,
    });
    await this.verificationCodeRepository.save(verificationCode);

    await this.mailService.sendVerificationCode({
      email: target,
      code,
      expiresIn: EXPIRES_IN,
    });

    return { success: true };
  }

  // 验证用户输入的验证码
  async verifyCode(
    provider: VerificationCodeProvider,
    target: string,
    code: string,
  ) {
    const record = await this.verificationCodeRepository.findOneBy({
      provider,
      target,
      code,
    });

    if (!record || isBefore(record.expiresAt, new Date())) {
      return { success: false, message: '验证码无效或已过期' };
    }

    // 验证成功后删除或标记已使用
    await this.verificationCodeRepository.delete({ id: record.id });

    return { success: true };
  }
}
