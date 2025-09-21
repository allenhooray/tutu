import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: configService.get('DATABASE_URL'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: false, // 生产环境应设置为false
  logging: configService.get('NODE_ENV') === 'development',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});