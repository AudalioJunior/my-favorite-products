import { Inject, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dtos/create_user.dto';
import { User } from '../entities/user.entity';
import { LoginUserDto } from '../dtos/login_user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    await this.validateExistUser(dto.email);
    return this.userRepository.createUser(dto);
  }

  async validateLogin(dto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.validateLogin(dto);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado ou credenciais inválidas');
    }
    return user;
  }

  private async validateExistUser(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new UnprocessableEntityException('Ops, email existente!');
    }
  }
}
