import { 
  Controller, 
  Post, 
  Get, 
  Delete, 
  Param, 
  Body, 
  HttpStatus,
  Query
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CreateFavoriteListProductDto } from '../dtos/create-product-favorite-list';
import { FavoriteListProductService } from '../services/favorite-list-product.service';

@Controller('favorite-lists/:listId/products')
export class FavoriteListProductController extends BaseController {
  constructor(
    private readonly favoriteListProductService: FavoriteListProductService
  ) {
    super();
  }

  @Post()
  async addProduct(
    @Param('listId') listId: string,
    @Body() createProductDto: CreateFavoriteListProductDto
  ) {
    const statusCode = HttpStatus.CREATED;
    const message = 'Produto adicionado à lista de favoritos com sucesso!';
    const data = await this.favoriteListProductService.addProductToList(
      +listId, 
      createProductDto
    );

    return this.baseResponse({ statusCode, message, data });
  }

  @Delete(':productId')
  async removeProduct(
    @Param('listId') listId: number,
    @Param('productId') productId: number
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Produto removido da lista com sucesso!';
    const data = await this.favoriteListProductService.removeProductFromList(
      listId, 
      productId
    );

    return this.baseResponse({ statusCode, message, data });
  }
}