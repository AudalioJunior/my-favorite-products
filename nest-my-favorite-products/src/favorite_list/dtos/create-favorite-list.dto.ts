import { IsNumber, IsString } from 'class-validator';


export class CreateFavoriteListDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  userId: number;
}