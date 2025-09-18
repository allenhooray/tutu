import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { BookInfo, BooksService } from './books.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/:isbn')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '根据 ISBN 查询图书' })
  @ApiResponse({ status: 200, description: '成功' })
  async queryBookByIsbn(@Param('isbn') isbn: string): Promise<BookInfo> {
    const bookInfo = await this.booksService.queryBookByIsbn(isbn);
    return bookInfo;
  }
}
