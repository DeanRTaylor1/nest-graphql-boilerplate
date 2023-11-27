import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserObjectType } from './dto/create-user.input';
import { PaginationInputType } from '@modules/base/pagination.type';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [UserObjectType])
  @UseGuards(JwtAuthGuard)
  async getUsers(@Args('pagination') { offset, limit }: PaginationInputType) {
    return this.usersService.findAll({ offset, limit });
  }

  @Query(() => UserObjectType)
  async getUser(@Args('userId') userId: string) {
    return await this.usersService.findOne(Number(userId));
  }
}
