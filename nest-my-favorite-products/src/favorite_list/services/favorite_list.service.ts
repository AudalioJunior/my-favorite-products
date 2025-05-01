import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FavoriteListRepository } from '../repository/favorite_list.repository';
import { CreateFavoriteListDto } from '../dtos/create-favorite-list.dto';
import { FavoriteList } from '../entities/favorite_list.entity';
import { UpdateFavoriteListDto } from '../dtos/update-favorite-list.dto';
import { UserRepository } from 'src/user/repository/user.repository';


@Injectable()
export class FavoriteListService {
  private readonly logger: Logger = new Logger(FavoriteListService.name);

  constructor(
    @Inject('FavoriteListRepository')
    private readonly favoriteListRepository: FavoriteListRepository,
    
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(createDto: CreateFavoriteListDto): Promise<FavoriteList> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createDto.userId },
        relations: ['favoriteList'], 
      });
  
      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }
  
      if (user.favoriteList) {
        throw new ConflictException('Usuário já possui uma lista de favoritos');
      }
  
      const favoriteList = new FavoriteList();
      favoriteList.title = createDto.title;
      favoriteList.description = createDto.description;
      favoriteList.user = user;
  
      return await this.favoriteListRepository.save(favoriteList);
    } catch (error) {
      this.logger.error(
        `Erro ao criar lista de favoritos: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
  

  async findOne(id: number): Promise<FavoriteList> {
    try {
      const list = await this.favoriteListRepository.findByIdWithProducts(id);
  
      if (!list) {
        throw new NotFoundException(`Lista de favoritos com ID ${id} não encontrada`);
      }
  
      return list;
    } catch (error) {
      this.logger.error(`Erro ao buscar lista de favoritos com ID ${id}`, error.stack);
      throw error;
    }
  }
  

  async update(id: number, updateDto: UpdateFavoriteListDto): Promise<FavoriteList> {
    try {
      const favoriteList = await this.findOne(id);
  
      let updated = false;
  
      if (updateDto.title && updateDto.title !== favoriteList.title) {
        favoriteList.title = updateDto.title;
        updated = true;
      }
  
      if (updateDto.description && updateDto.description !== favoriteList.description) {
        favoriteList.description = updateDto.description;
        updated = true;
      }
  
      if (!updated) {
        this.logger.warn(`Nenhuma alteração aplicada na lista de ID ${id}`);
        return favoriteList;
      }
  
      return await this.favoriteListRepository.save(favoriteList);
    } catch (error) {
      this.logger.error(`Erro ao atualizar lista de favoritos com ID ${id}`, error.stack);
      throw error;
    }
  }
  

  async remove(id: number): Promise<void> {
    try {
      const list = await this.findOne(id);
      await this.favoriteListRepository.remove(list);
  
      this.logger.log(`Lista de favoritos com ID ${id} removida com sucesso`);
    } catch (error) {
      this.logger.error(`Erro ao remover lista de favoritos com ID ${id}`, error.stack);
      throw error;
    }
  }

  async findByUserId(userId: number): Promise<FavoriteList> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['favoriteList', 'favoriteList.products'],
      });
  
      if (!user) {
        throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
      }
  
      if (!user.favoriteList) {
        throw new NotFoundException(`Usuário com ID ${userId} não possui lista de favoritos`);
      }
  
      return user.favoriteList;
    } catch (error) {
      this.logger.error(`Erro ao buscar lista por usuário ID ${userId}`, error.stack);
      throw error;
    }
  }
}
