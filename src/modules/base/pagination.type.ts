import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInputType {
  @Field((_type) => Int)
  offset: number = 0;

  @Field((_type) => Int)
  limit: number = 10;
}
