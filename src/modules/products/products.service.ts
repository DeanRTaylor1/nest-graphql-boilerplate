import { Injectable } from '@nestjs/common';

import { Pagination } from '@modules/base/pagination.type';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async create(createProductInput: CreateProductInput) {
    return this.productsRepository.create(createProductInput);
  }

  findAll({ offset, limit }: Pagination, attributes?: Array<string>) {
    return this.productsRepository.getAll({ offset, limit, attributes });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, _updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
