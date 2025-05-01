// favorite-list.repository.ts
import { DataSource, Repository } from 'typeorm';
import { FavoriteList } from '../entities/favorite_list.entity';
import { User } from 'src/user/entities/user.entity';


export class FavoriteListRepository extends Repository<FavoriteList> {
    constructor(private dataSource: DataSource) {
      super(User, dataSource.createEntityManager());
    }
    
}
