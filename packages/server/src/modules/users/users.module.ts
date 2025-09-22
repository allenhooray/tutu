import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { Identity } from '../auth/identity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Identity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 提供给 AuthModule 调用
})
export class UsersModule {}
