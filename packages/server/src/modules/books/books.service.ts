import { Injectable } from '@nestjs/common';
import { CozeService } from 'src/common/services/coze.service';

export interface BookInfo {
  /** 图书isbn */
  isbn?: string;
  /** 图书封面图片 */
  coverImg?: string;
  /** 正书名 */
  title?: string;
  /** 丛书名 */
  seriesTitle?: string;
  /** 出版单位 */
  publisher?: string;
  /** 出版地 */
  placeOfPublication?: string;
  /** 作者 */
  author?: string;
  /** 出版时间 */
  publicationDate?: string;
  /** 分册名 */
  volumeName?: string;
  /** 分册号 */
  volumeNumber?: string;
  /** 定价（元） */
  price?: number;
  /** 正文语种 */
  languageOfText?: string;
  /** 中图法分类 */
  classificationOfChineseLibraryClassification?: string;
  /** 主题词 */
  subjectTerms?: string[];
  /** 内容摘要 */
  contentAbstract?: string;
}

interface WorkflowRunRespData {
  output?: string;
}

const WORKFLOW_ID = '7551100698411597875';

@Injectable()
export class BooksService {
  constructor(private readonly cozeService: CozeService) { }

  async queryBookByIsbn(isbn: string): Promise<BookInfo> {
    const resp = await this.cozeService.cozeApi.workflows.runs.create({
      workflow_id: WORKFLOW_ID,
      parameters: {
        input: isbn,
      },
    });
    try {
      const bookInfoDataString = JSON.parse(
        resp.data || '{}',
      ) as WorkflowRunRespData;
      const bookInfo = JSON.parse(
        bookInfoDataString?.output || '{}',
      ) as BookInfo | null;
      return bookInfo || {};
    } catch (error) {
      console.log('error', error);
      return {};
    }
  }
}
