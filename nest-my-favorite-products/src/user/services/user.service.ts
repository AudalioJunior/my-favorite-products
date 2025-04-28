import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create_user.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repository/user.repository";
import { LoginUserDto } from "../dtos/login_user.dto";

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      await this.validateExistUser(createUserDto.email);

      return await this.userRepository.createUser(createUserDto);
    } catch (error) {
      this.logger.error(`Error na criação do usuário: `, error);
      throw error;
    }
  }

  async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
    try {
      const userResponse = await this.userRepository.validateLogin(loginUserDto);
      
      if (!userResponse) {
        throw new NotFoundException("Usuário não encontrado ou senha/email incorretos!");
      }

      return userResponse;
    } catch (error) {
      this.logger.error(`Error na validação do login do usuário: `, error);
      throw error;
    }
  }

  private async validateExistUser(email: string) {
    const userResponse = await this.userRepository.findByEmail(email);

    if (userResponse) {
      throw new NotFoundException("Ops, email existente!")
    }
  }
}