import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersRepository, UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule.forFeature([User]), UsersRepository, UsersService],
})
export class UsersModule {}
