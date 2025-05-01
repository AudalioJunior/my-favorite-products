import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create_user.dto';
import { LoginUserDto } from '../dtos/login_user.dto';


export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.create(dto);
    return this.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async validateLogin(dto: LoginUserDto): Promise<User | null> {
    return this.findOne({
      where: {
        email: dto.email,
        password: dto.password,
      },
    });
  }
}
