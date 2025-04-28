import { IBaseResponse } from './interfaces/base-response.interface';

export class BaseController {
  protected baseResponse({ statusCode, message, data }: { statusCode: number; message: string; data: any }): IBaseResponse {
    return { statusCode, message, data };
  }
}
