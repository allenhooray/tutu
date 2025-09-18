import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CozeService } from 'src/common/services/coze.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [CozeService, BooksService],
})
export class BooksModule {}
