import { Module } from '@nestjs/common';
import { VerificationCodesService } from './verification-codes.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [VerificationCodesService, PrismaService],
  exports: [VerificationCodesService],
})
export class VerificationCodesModule {}
