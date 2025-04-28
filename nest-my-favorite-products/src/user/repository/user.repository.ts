import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create_user.dto";
import { LoginUserDto } from "../dtos/login_user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.create(createUserDto);
      return await this.save(user); 
    } catch (error) {
      throw new UnprocessableEntityException('Erro ao criar o cliente');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.findOne({ 
        where: { email },
      });
    } catch (error) {
      throw new UnprocessableEntityException(`Erro ao buscar o usuário do email: ${email}`);
    }
  }

  async validateLogin(loginUserDto: LoginUserDto): Promise<User | null> {
    try {
      return await this.findOne({
        where: {
          email: loginUserDto.email, 
          password: loginUserDto.password
        }
      })
    } catch (error) {
      throw new UnprocessableEntityException(`Erro ao validar o login`);
    }
  }
}