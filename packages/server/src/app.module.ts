import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './common/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { VerificationCodesModule } from './modules/verification-codes/verification-codes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使配置在全局可用
      envFilePath: '.env', // 指定 env 文件路径
    }),
    PrismaService,
    UsersModule, // 管理用户信息
    VerificationCodesModule, // 管理验证码逻辑
    AuthModule, // 登录/注册/鉴权逻辑，依赖上面模块
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
