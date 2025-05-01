import { BadRequestException, ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { FavoriteListProducts } from '../entities/favorite_list_product.entity';
import { CreateFavoriteListProductDto } from '../dtos/create-product-favorite-list';
import { FavoriteListProductRepository } from '../repository/favorite-list-product.repository';


@Injectable()
export class FavoriteListProductService {
  private readonly logger: Logger = new Logger(FavoriteListProductService.name);

  constructor(
    @Inject('FavoriteListProductRepository')
    private readonly favoriteListProductRepository: FavoriteListProductRepository,
  ) {}

  async addProductToList(
    listId: number,
    createProductDto: CreateFavoriteListProductDto,
  ): Promise<FavoriteListProducts> {
    try {  
      const productExists = await this.favoriteListProductRepository.findProductInList(
        listId,
        createProductDto.productId
      );
      if (productExists) {
        throw new ConflictException('Este produto já está na lista de favoritos');
      }
  
      const productCount = await this.favoriteListProductRepository.countProductsInList(listId);
      if (productCount >= 5) {
        throw new BadRequestException('A lista de favoritos atingiu o limite máximo de 5 produtos');
      }
  
      
      return this.favoriteListProductRepository.addProductToList(listId, {
        productId: createProductDto.productId,
        name: createProductDto.name,
        price: createProductDto.price,
        imageUrl: createProductDto.imageUrl
      });
    } catch (error) {
      this.logger.error('Error ao tentar favoritar um produto.');
      throw error;
    }
  }

  async removeProductFromList(
    listId: number,
    productId: number
  ): Promise<void> {
    const result = await this.favoriteListProductRepository.removeProductFromList(listId, productId);

  }
}
