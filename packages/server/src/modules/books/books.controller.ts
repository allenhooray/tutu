import { Controller, Get, Param } from '@nestjs/common';
import { BookInfo, BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryBookByIsbnDto } from './books.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/:isbn')
  @ApiOperation({ summary: '根据 ISBN 查询图书' })
  @ApiResponse({ status: 200, description: '成功' })
  async queryBookByIsbn(
    @Param() params: QueryBookByIsbnDto,
  ): Promise<BookInfo> {
    const bookInfo = await this.booksService.queryBookByIsbn(params.isbn);
    return bookInfo;
  }
}
