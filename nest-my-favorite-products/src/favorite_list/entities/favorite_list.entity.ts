import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FavoriteListProducts } from "./favorite_list_product.entity";
import { User } from "src/user/entities/user.entity";

@Entity('favorite_list')
export class FavoriteList extends BaseEntity {
  @PrimaryGeneratedColumn()
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

  @OneToOne(() => User, (user) => user.favoriteList)
  @JoinColumn({ name: 'user_id' }) // cria coluna user_id na tabela
  user: User;
  }
  