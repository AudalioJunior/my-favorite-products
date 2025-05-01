import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
    },
  ],
  exports: ['UserRepository', UserService],
})
export class UserModule {}
