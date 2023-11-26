import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { UserStatusEnum, RoleEnum } from '../user.enum';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class UserObjectType {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  email: string;

  @Field(() => UserStatusEnum, { nullable: true })
  status?: UserStatusEnum;

  @Field(() => RoleEnum, { nullable: true })
  role?: RoleEnum;
}
