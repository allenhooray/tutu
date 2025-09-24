import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUserDto } from './users.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户信息' })
  @ApiResponse({ status: 200, description: '成功', type: User })
  async getUser(@Param() params: GetUserDto) {
    return this.usersService.findById(params.id);
  }

  /**
   * 获取当前用户信息
   * 这个接口需要JWT认证
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取当前用户信息' })
  @ApiResponse({ status: 200, description: '成功', type: User })
  @ApiResponse({ status: 401, description: '未授权' })
  getCurrentUser(@Request() req: Request & { user: User }) {
    // JwtStrategy验证通过后，用户信息会被添加到req.user中
    return req.user;
  }
}
