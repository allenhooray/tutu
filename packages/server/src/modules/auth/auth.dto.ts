import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OAuthProvider } from '../../common/typeorm/enums';

export class LoginPasswordDto {
  @ApiPropertyOptional({ description: '用户名、邮箱或手机号' })
  username?: string;

  @ApiPropertyOptional({ description: '邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号' })
  phone?: string;

  @ApiProperty({ description: '密码' })
  password: string;
}

export class LoginCodeSendCodeDto {
  @ApiPropertyOptional({ description: '邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号' })
  phone?: string;
}

export class LoginCodeVerifyDto {
  @ApiPropertyOptional({ description: '邮箱' })
  email?: string;

  @ApiPropertyOptional({ description: '手机号' })
  phone?: string;

  @ApiProperty({ description: '验证码' })
  code: string;
}

/**
 * OAuth登录参数
 */
export class LoginOAuthDto {
  @ApiProperty({ description: 'OAuth提供商' })
  provider: OAuthProvider;

  @ApiProperty({ description: 'OAuth授权码' })
  code: string;
}
