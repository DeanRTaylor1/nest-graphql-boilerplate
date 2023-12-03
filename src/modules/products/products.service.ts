import { Injectable } from '@nestjs/common';

import { Pagination } from '@modules/base/pagination.type';
import { env } from '@modules/config/env';
import { RabbitMQService } from '@modules/rmq/RabbitMQ.service';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private rabbitMqService: RabbitMQService,
  ) {}

  async create(createProductInput: CreateProductInput) {
    const result = await this.rabbitMqService.sendMessage(
      env.RabbitMq.ordersQueue,
      JSON.stringify(createProductInput),
    );
    // await this.rabbitMqService.processMessages();
    console.log(result);
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
