import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { FavoriteListProducts } from "./favorite_list_product.entity";

@Entity('favorite_list')
export class FavoriteList extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;


  @OneToMany(
    () => FavoriteListProducts, 
    (product) => product.favoriteList,
    { cascade: true } 
  )
  products: FavoriteListProducts[];
  }
  