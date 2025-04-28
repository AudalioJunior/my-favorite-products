import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { BaseController } from "src/base/base.controller";
import { CreateUserDto } from "../dtos/create_user.dto";
import { UserService } from "../services/user.service";
import { LoginUserDto } from "../dtos/login_user.dto";

@Controller('users')
export class UserController extends BaseController {

  constructor(
    private readonly userService: UserService
  ) {
    super();
  }

  @Post()
  async create(
    @Body() createUserBodyDto: CreateUserDto
  ) {
    const statusCode = HttpStatus.CREATED;
    const message = 'Usuário criado com sucesso!';
    const data = await this.userService.createUser(createUserBodyDto);

    return this.baseResponse({statusCode, message, data})
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Usuário validado com sucesso!';
    const data = await this.userService.validateLogin(loginUserDto);

    return this.baseResponse({statusCode, message, data});
  }
}