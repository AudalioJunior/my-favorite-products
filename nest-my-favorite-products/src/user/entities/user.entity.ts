import { FavoriteList } from "src/favorite_list/entities/favorite_list.entity";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => FavoriteList, (list) => list.user, { cascade: true })
  favoriteList: FavoriteList;
}
