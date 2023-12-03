import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';

import { Pagination } from '@modules/base/pagination.type';
import { PaginatedExtractionPipe } from 'src/pipes/ExtractPaginationFields.pipe';

import { CreateProductInput } from './dto/create-product.input';
import { PaginatedProductResponse } from './dto/product-paginated.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.create(createProductInput);
  }

  // @UseGuards(JwtAuthGuard)
  @Query(() => PaginatedProductResponse, { name: 'products' })
  findAll(
    @Args('pagination') { offset, limit }: Pagination,
    @Info(PaginatedExtractionPipe) attributes: Array<string>,
  ) {
    console.log(attributes, offset, limit);
    return this.productsService.findAll({ offset, limit }, attributes);
  }

  @Query(() => Product, { name: 'product' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.remove(id);
  }
}
