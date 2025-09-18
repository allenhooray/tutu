import { Controller, Get, Param } from '@nestjs/common';
import { BookInfo, BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/:isbn')
  async queryBookByIsbn(@Param('isbn') isbn: string): Promise<BookInfo> {
    const bookInfo = await this.booksService.queryBookByIsbn(isbn);
    return bookInfo;
  }
}
