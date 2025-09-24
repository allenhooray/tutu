import { ApiProperty } from '@nestjs/swagger';

/**
 * 根据ISBN查询图书参数
 */
export class QueryBookByIsbnDto {
  @ApiProperty({ description: '图书ISBN' })
  isbn: string;
}
