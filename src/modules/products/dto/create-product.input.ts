import { InputType, Int, Field, Float } from '@nestjs/graphql';

import { ICreateAttributes } from '@modules/base/global.types';

import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput implements ICreateAttributes<Product> {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;
}
