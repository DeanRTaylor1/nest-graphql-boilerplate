import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field((_type) => Int)
  offset: number = 0;

  @Field((_type) => Int)
  limit: number = 10;
}

export function createPaginatedResponseType<TItem>(
  TItemClass: new () => TItem,
) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse {
    @Field((_type) => [TItemClass])
    items: TItem[];

    @Field((_type) => Int)
    count: number;
  }

  return PaginatedResponse;
}
