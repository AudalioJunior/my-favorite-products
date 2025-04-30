import { Injectable } from "@nestjs/common";
import { FavoriteListProducts } from "../entities/favorite_list_product.entity";
import { Repository } from "typeorm";

@Injectable()
export class FavoriteListProductRepository extends Repository<FavoriteListProducts> {
  async findProductInList(listId: number, productId: number): Promise<FavoriteListProducts | null> {
    return this.createQueryBuilder('product')
      .where('product.favoriteListId = :listId', { listId })
      .andWhere('product.productId = :productId', { productId })
      .getOne();
  }

  async countProductsInList(listId: number): Promise<number> {
    return this.createQueryBuilder('product')
      .where('product.favoriteListId = :listId', { listId })
      .getCount();
  }

  async addProductToList(
    listId: number,
    productData: {
      productId: number;
      name: string;
      price: number;
      imageUrl?: string;
    }
  ): Promise<FavoriteListProducts> {
    const product = this.create({
      ...productData,
      favoriteListId: listId
    });

    return this.save(product);
  }

  async removeProductFromList(listId: number, productId: number): Promise<void> {
    await this.createQueryBuilder()
      .delete()
      .where('favoriteListId = :listId', { listId })
      .andWhere('productId = :productId', { productId })
      .execute();
  }
}