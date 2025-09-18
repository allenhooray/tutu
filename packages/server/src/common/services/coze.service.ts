import { CozeAPI, COZE_CN_BASE_URL } from '@coze/api';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CozeService {
  private _cozeApi: CozeAPI;

  public get cozeApi() {
    return this._cozeApi;
  }

  constructor(private configService: ConfigService) {
    this._cozeApi = new CozeAPI({
      token: this.configService.get<string>('COZE_SAT', ''),
      baseURL: COZE_CN_BASE_URL,
    });
  }
}
