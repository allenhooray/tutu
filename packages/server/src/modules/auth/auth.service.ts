import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  // 默认用户名和密码均为 admin
  private readonly DEFAULT_USERNAME = 'admin';
  private readonly DEFAULT_PASSWORD = 'admin';

  /**
   * 验证用户凭证
   * @param username 用户名
   * @param password 密码
   * @returns 是否验证成功
   */
  validateCredentials(username: string, password: string): boolean {
    return (
      username === this.DEFAULT_USERNAME && password === this.DEFAULT_PASSWORD
    );
  }

  /**
   * 从 Authorization 头中提取凭证
   * @param authorizationHeader Authorization 头信息
   * @returns 包含用户名和密码的对象
   */
  extractCredentials(authorizationHeader: string): {
    username: string;
    password: string;
  } {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, credentials] = authorizationHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    try {
      const decodedCredentials = Buffer.from(credentials, 'base64').toString(
        'utf-8',
      );
      const [username, password] = decodedCredentials.split(':');

      if (!username || !password) {
        throw new UnauthorizedException('Invalid credentials format');
      }

      return { username, password };
    } catch (error) {
      throw new UnauthorizedException('Failed to decode credentials');
    }
  }
}
