import { Module } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  providers: [VerificationCodesService, PrismaService, MailModule],
  exports: [VerificationCodesService],
})
export class VerificationCodesModule {}
