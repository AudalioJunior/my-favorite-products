import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create_user.dto";
import { LoginUserDto } from "../dtos/login_user.dto";

@Injectable()
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    return await this.save(user); 
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ 
      where: { email },
    });
  }

  async validateLogin(loginUserDto: LoginUserDto): Promise<User | null> {
    return await this.findOne({
      where: {
        email: loginUserDto.email, 
        password: loginUserDto.password
      }
    })
  }
}