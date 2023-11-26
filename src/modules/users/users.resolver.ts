import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './graphql/create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => CreateUserInput)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.create(createUserData);
  }
}
