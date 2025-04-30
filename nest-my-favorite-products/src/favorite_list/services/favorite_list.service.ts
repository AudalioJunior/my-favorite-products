import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FavoriteListRepository } from '../repository/favorite_list.repository';
import { CreateFavoriteListDto } from '../dtos/create-favorite-list.dto';
import { FavoriteList } from '../entities/favorite_list.entity';
import { UpdateFavoriteListDto } from '../dtos/update-favorite-list.dto';
import { FavoriteListProducts } from '../entities/favorite_list_product.entity';
import { CreateFavoriteListProductDto } from '../dtos/create-product-favorite-list';
import { FavoriteListProductRepository } from '../repository/favorite-list-product.repository';


@Injectable()
export class FavoriteListService {
  private readonly logger: Logger = new Logger(FavoriteListService.name);

  constructor(
    private readonly favoriteListRepository: FavoriteListRepository,
    private readonly favoriteListProductRepository: FavoriteListProductRepository
  ) {}

  async create(createDto: CreateFavoriteListDto): Promise<FavoriteList> {
    try {
      const favoriteList = new FavoriteList();
      favoriteList.title = createDto.title;
      favoriteList.description = createDto.description;


      return await this.favoriteListRepository.save(favoriteList);
    } catch (error) {
      this.logger.error(`Erro ao criar lista de favoritos: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<FavoriteList[]> {
    try {
      const lists = await this.favoriteListRepository.find({ relations: ['products'] });

      if (!lists || lists.length === 0) {
        throw new NotFoundException('Nenhuma lista de favoritos encontrada');
      }

      return lists;
    } catch (error) {
      this.logger.error('Erro ao buscar todas as listas de favoritos', error.stack);
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
      
      if (updateDto.title) favoriteList.title = updateDto.title;
      if (updateDto.description) favoriteList.description = updateDto.description;
      

      return await this.favoriteListRepository.save(favoriteList);
    } catch (error) {
      this.logger.error(`Erro ao atualizar lista de favoritos com ID ${id}`, error.stack);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.favoriteListRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Lista de favoritos com ID ${id} não encontrada`);
      }
      this.logger.log(`Lista de favoritos com ID ${id} removida com sucesso`);
    } catch (error) {
      this.logger.error(`Erro ao remover lista de favoritos com ID ${id}`, error.stack);
      throw error;
    }
  }
}
