import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponse as SwaggerApiResponse,
} from '@nestjs/swagger';

/**
 * 统一响应格式的Swagger装饰器
 * @param model 原始数据类型（DTO或实体类）
 */
export function ApiResponse<TModel extends Type<any>>(model?: TModel) {
  return applyDecorators(
    ApiOkResponse({
      description: '请求成功',
      type: model,
    }),
    SwaggerApiResponse({
      description: '请求失败',
    }),
  );
}
