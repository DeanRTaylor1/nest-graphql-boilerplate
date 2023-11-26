import { UserObjectType } from '@modules/users/dto/create-user.input';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserObjectType)
  user: UserObjectType;
}
