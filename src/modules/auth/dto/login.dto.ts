import { Field, ObjectType } from '@nestjs/graphql';

import { UserObjectType } from '@modules/users/dto/create-user.input';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserObjectType)
  user: UserObjectType;
}
