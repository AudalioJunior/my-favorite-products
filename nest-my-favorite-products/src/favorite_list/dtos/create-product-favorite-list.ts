import { IsNumber, IsString, IsDecimal, IsUrl, IsOptional } from 'class-validator';

export class CreateFavoriteListProductDto {
  @IsNumber()
  productId: number;

  @IsString()
  name: string;

  @IsDecimal()
  price: number;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}