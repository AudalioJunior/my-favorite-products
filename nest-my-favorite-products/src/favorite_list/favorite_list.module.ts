import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteListController } from './controllers/favorite-list.controller';
import { FavoriteList } from './entities/favorite_list.entity';
import { FavoriteListRepository } from './repository/favorite_list.repository';
import { FavoriteListService } from './services/favorite_list.service';
import { FavoriteListProducts } from './entities/favorite_list_product.entity';
import { FavoriteListProductRepository } from './repository/favorite-list-product.repository';
import { FavoriteListProductController } from './controllers/favorite-list-product.controller';
import { FavoriteListProductService } from './services/favorite-list-product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteList,
      FavoriteListProducts,
      FavoriteListRepository,
      FavoriteListProductRepository
    ]),
  ],
  controllers: [FavoriteListController, FavoriteListProductController],
  providers: [FavoriteListService, FavoriteListProductService],
  exports: [FavoriteListService, FavoriteListProductService], 
})
export class FavoriteListModule {}