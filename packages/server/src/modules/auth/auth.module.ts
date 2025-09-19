import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { OAuthTokensModule } from '../oauth-tokens/oauth-tokens.module';
import { VerificationCodesModule } from '../verification-codes/verification-codes.module';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [
    PrismaService,
    UsersModule, // 操作 User/Identity
    OAuthTokensModule, // 保存/查询 OAuth token
    VerificationCodesModule, // 验证码登录
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuthService], // PrismaService 已经在各自模块注入
})
export class AuthModule {}
