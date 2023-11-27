import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.dto';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards, UsePipes } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import {
  UserObjectType,
  CreateUserInput,
} from '@modules/users/dto/create-user.input';
import { UsersService } from '@modules/users/users.service';
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
