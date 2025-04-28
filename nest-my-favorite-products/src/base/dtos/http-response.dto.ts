import { IsEnum, IsString, IsOptional } from 'class-validator';
import { HttpStatus } from '@nestjs/common';

export class HttpResponseDto {
  @IsEnum(HttpStatus)
  public status!: HttpStatus;

  @IsString()
  public message!: string;

  @IsOptional()
  public data?: any;
}
