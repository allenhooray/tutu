import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // 获取异常响应内容
    const exceptionResponse = exception.getResponse();
    const message =
      typeof exceptionResponse === 'object'
        ? (exceptionResponse as any).message || exception.message
        : exception.message;

    response.status(status).json({
      code: status, // 错误状态码
      message: message || 'error', // 错误消息
      data: null, // 错误时数据为null
    });
  }
}
