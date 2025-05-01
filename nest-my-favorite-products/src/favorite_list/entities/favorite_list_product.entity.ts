import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteList } from './favorite_list.entity';


@Entity('favorite_list_product')
export class FavoriteListProducts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  favoriteListId: number;

  @Column()
  productId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @ManyToOne(
    () => FavoriteList, 
    (favoriteList) => favoriteList.products,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'favoriteListId' })
  favoriteList: FavoriteList;
}