import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import {
  UserObjectType,
  CreateUserInput,
} from '@modules/users/dto/create-user.input';
import { UsersService } from '@modules/users/users.service';

import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { HashPasswordPipe } from './pipes/hash-password.pipe';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() { user },
  ) {
    return this.authService.login(user);
  }

  @Mutation(() => UserObjectType)
  @UsePipes(HashPasswordPipe)
  async createUser(
    @Args('createUserData')
    createUserData: CreateUserInput,
  ) {
    return this.usersService.create(createUserData);
  }
}
