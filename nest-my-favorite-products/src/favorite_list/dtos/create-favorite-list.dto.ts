import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { FavoriteListProductDto } from './favorite-list-product.dto';


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