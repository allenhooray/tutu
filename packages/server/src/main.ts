import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import packageJson from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger 文档信息
  const config = new DocumentBuilder()
    .setTitle('API 文档')
    .setDescription('供前端调用的接口文档')
    .setVersion(packageJson.version)
    .addTag('users') // 添加标签
    .addBearerAuth() // 如果有认证
    .build();

  // 创建文档
  const document = SwaggerModule.createDocument(app, config);

  // 挂载 Swagger UI
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
