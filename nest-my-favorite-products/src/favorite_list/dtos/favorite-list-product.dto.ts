import { IsNumber } from 'class-validator';

export class FavoriteListProductDto {
  @IsNumber()
  id: number;

  @IsNumber()
  productId: number;
}