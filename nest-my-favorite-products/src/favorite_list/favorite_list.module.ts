import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FavoriteListController } from './controllers/favorite-list.controller';
import { FavoriteListProductController } from './controllers/favorite-list-product.controller';

import { FavoriteListProductService } from './services/favorite-list-product.service';

import { DataSource } from 'typeorm';
import { UserModule } from '../user/user.module';
import { FavoriteList } from './entities/favorite_list.entity';
import { FavoriteListProducts } from './entities/favorite_list_product.entity';
import { FavoriteListProductRepository } from './repository/favorite-list-product.repository';
import { FavoriteListRepository } from './repository/favorite_list.repository';
import { FavoriteListService } from './services/favorite_list.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteList, FavoriteListProducts]),
    UserModule,
  ],
  controllers: [FavoriteListController, FavoriteListProductController],
  providers: [
    FavoriteListService,
    FavoriteListProductService,
    {
      provide: 'FavoriteListRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(FavoriteList).extend(FavoriteListRepository.prototype);
      },
    },
    {
      provide: 'FavoriteListProductRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(FavoriteListProducts).extend(FavoriteListProductRepository.prototype);
      },
    },
  ],
  exports: [
    FavoriteListService,
    FavoriteListProductService,
    'FavoriteListRepository',
    'FavoriteListProductRepository',
  ],
})
export class FavoriteListModule {}
