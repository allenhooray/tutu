import { Module } from '@nestjs/common';
import { OAuthTokensService } from './oauth-tokens.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  providers: [OAuthTokensService, PrismaService],
  exports: [OAuthTokensService],
})
export class OAuthTokensModule {}
