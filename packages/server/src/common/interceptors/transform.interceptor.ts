import {
  Injectable,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 定义统一响应格式的接口
export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<NonNullable<T> | null>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<NonNullable<T> | null>> {
    return next.handle().pipe(
      map((data) => ({
        code: 200, // 成功状态码
        message: 'success', // 成功消息
        data: data || null, // 业务数据，默认为null
      })),
    );
  }
}
