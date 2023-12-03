import { ObjectType } from '@nestjs/graphql';

import { createPaginatedResponseType } from '@modules/base/pagination.type';

import { Product } from '../entities/product.entity';

@ObjectType()
export class PaginatedProductResponse extends createPaginatedResponseType(
  Product,
) {}
