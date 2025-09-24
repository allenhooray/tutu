import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OAuthService } from './oauth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { OAuthTokensModule } from '../oauth-tokens/oauth-tokens.module';
import { VerificationCodesModule } from '../verification-codes/verification-codes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Identity } from './identity.entity';
import { JwtAuthModule } from '../../common/auth/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Identity]),
    UsersModule, // 操作 User/Identity
    OAuthTokensModule, // 保存/查询 OAuth token
    VerificationCodesModule, // 验证码登录
    JwtAuthModule, // JWT认证模块
  ],
  controllers: [AuthController],
  providers: [AuthService, OAuthService],
})
export class AuthModule {}
