import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './common/typeorm/typeorm.module';
import { UsersModule } from './modules/users/users.module';
import { VerificationCodesModule } from './modules/verification-codes/verification-codes.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使配置在全局可用
      envFilePath: '.env', // 指定 env 文件路径
    }),
    DatabaseModule,
    UsersModule, // 管理用户信息
    VerificationCodesModule, // 管理验证码逻辑
    AuthModule, // 登录/注册/鉴权逻辑，依赖上面模块
    BooksModule,
  ],
  controllers: [AppController],
  providers: [
    // 全局注册统一响应拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // 全局注册异常过滤器
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
