import { HttpStatus } from '@nestjs/common';

export interface IBaseResponse {
  statusCode: HttpStatus;
  message: string;
  data?: any;
}
