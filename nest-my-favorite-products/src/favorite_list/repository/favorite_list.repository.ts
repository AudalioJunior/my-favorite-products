import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FavoriteList } from '../entities/favorite_list.entity';

@Injectable()
export class FavoriteListRepository extends Repository<FavoriteList> {
  async findByIdWithProducts(id: number): Promise<FavoriteList | null> {
    return this.findOne({
      where: { id },
      relations: ['products'],
    });
  }
}