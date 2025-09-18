import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const authorizationHeader = request.headers.authorization;

    try {
      const { username, password } =
        this.authService.extractCredentials(authorizationHeader);
      const isAuthenticated = this.authService.validateCredentials(
        username,
        password,
      );

      if (!isAuthenticated) {
        // 设置 WWW-Authenticate 响应头，使浏览器弹出鉴权窗口
        response.set('WWW-Authenticate', 'Basic realm="API Access"');
        throw new UnauthorizedException('Invalid username or password');
      }

      return true;
    } catch (error) {
      // 对于所有未授权错误，都设置 WWW-Authenticate 响应头
      response.set('WWW-Authenticate', 'Basic realm="API Access"');
      throw error;
    }
  }
}
