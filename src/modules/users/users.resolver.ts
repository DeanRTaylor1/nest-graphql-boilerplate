import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, UserObjectType } from './graphql/create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserObjectType)
  async getUser(@Args('userId') userId: string) {
    return this.usersService.findOne(Number(userId));
  }

  @Mutation(() => UserObjectType)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.create(createUserData);
  }
}
