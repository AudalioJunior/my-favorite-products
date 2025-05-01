import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { FavoriteList } from './favorite_list/entities/favorite_list.entity';
import { FavoriteListProducts } from './favorite_list/entities/favorite_list_product.entity';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, FavoriteList, FavoriteListProducts],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
});
