import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodesService } from './verification-codes.service';
import { VerificationCode } from './verification-code.entity';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationCode]), MailModule],
  providers: [VerificationCodesService],
  exports: [VerificationCodesService],
}) export class VerificationCodesModule {}
