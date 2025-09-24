import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 获取用户信息参数
 */
export class GetUserDto {
  @ApiProperty({ description: '用户ID' })
  id: string;
}

/**
 * 创建用户参数
 */
export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiPropertyOptional({ description: '手机号' })
  phone?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '姓名' })
  name?: string;

  @ApiPropertyOptional({ description: '头像URL' })
  avatarUrl?: string;
}