import { CozeAPI, COZE_CN_BASE_URL } from '@coze/api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CozeService {
  private readonly _cozeApi = new CozeAPI({
    token: process.env.COZE_SAT || '',
    baseURL: COZE_CN_BASE_URL,
  });

  public get cozeApi() {
    return this._cozeApi;
  }
}
