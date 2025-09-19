import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  /**
   * 发送验证码邮件
   * @param email 收件人邮箱
   * @param code 验证码
   * @param expiresIn 有效期（分钟）
   */
  async sendVerificationCode({
    email,
    code,
    expiresIn = 10,
  }: {
    /** 收件人邮箱 */
    email: string;
    /** 验证码 */
    code: string;
    /** 有效期（分钟） */
    expiresIn?: number;
  }) {
    try {
      return await this.mailerService.sendMail({
        to: email,
        subject: '您的验证码',
        template: './verification', // 模板文件路径
        context: {
          code,
          expiresIn,
        },
      });
    } catch (error) {
      console.error('发送验证码邮件失败:', error);
      throw new Error('发送验证码失败，请稍后重试');
    }
  }
}
