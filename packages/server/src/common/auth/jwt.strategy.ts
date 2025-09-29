import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/users.service';
import { HEADERS } from 'src/constants/headers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader(HEADERS.AUTHORIZATION),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    // 这里可以根据需要验证用户信息
    console.log('payload', payload);
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new Error('用户不存在');
    }
    return user;
  }
}
