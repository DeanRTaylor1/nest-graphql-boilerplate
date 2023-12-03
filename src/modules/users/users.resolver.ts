import { UseGuards } from '@nestjs/common';
import { Args, Info, Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Pagination } from '@modules/base/pagination.type';
import { ExtractFieldsPipe } from 'src/pipes/ExtractFields.pipe';

import { UserObjectType } from './dto/create-user.input';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserObjectType])
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @Args('pagination') { offset, limit }: Pagination,
    @Info(ExtractFieldsPipe) attributes: string[],
  ) {
    return this.usersService.findAll({ offset, limit }, attributes);
  }

  @Query(() => UserObjectType)
  async getUser(@Args('userId') userId: string) {
    return await this.usersService.findOne(Number(userId));
  }
}
