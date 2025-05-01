import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpStatus 
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { CreateFavoriteListDto } from '../dtos/create-favorite-list.dto';
import { UpdateFavoriteListDto } from '../dtos/update-favorite-list.dto';
import { FavoriteListService } from '../services/favorite_list.service';


@Controller('favorite-lists')
export class FavoriteListController extends BaseController {
  
  constructor(
    private readonly favoriteListService: FavoriteListService
  ) {
    super();
  }

  @Post()
  async create(
    @Body() createDto: CreateFavoriteListDto
  ) {
    const statusCode = HttpStatus.CREATED;
    const message = 'Lista de favoritos criada com sucesso!';
    const data = await this.favoriteListService.create(createDto);

    return this.baseResponse({ statusCode, message, data });
  }

  @Get('user/:userId')
  async findByUserId(
    @Param('userId') userId: number
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Lista de favoritos recuperada por usuário!';
    const data = await this.favoriteListService.findByUserId(userId);

    return this.baseResponse({ statusCode, message, data });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Lista de favoritos recuperada com sucesso!';
    const data = await this.favoriteListService.findOne(+id);

    return this.baseResponse({ statusCode, message, data });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateFavoriteListDto
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Lista de favoritos atualizada com sucesso!';
    const data = await this.favoriteListService.update(id, updateDto);

    return this.baseResponse({ statusCode, message, data });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: number
  ) {
    const statusCode = HttpStatus.OK;
    const message = 'Lista de favoritos removida com sucesso!';
    const data = await this.favoriteListService.remove(id);

    return this.baseResponse({ statusCode, message, data });
  }
}