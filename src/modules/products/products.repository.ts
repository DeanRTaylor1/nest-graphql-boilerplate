import { InjectModel } from '@nestjs/sequelize';

import { BaseRepository } from '@modules/base/base.repository';
import { ICreateAttributes } from '@modules/base/global.types';

import { Product } from './entities/product.entity';

export class ProductsRepository extends BaseRepository<Product> {
  constructor(
    @InjectModel(Product)
    userModel: typeof Product,
  ) {
    super(userModel);
  }

  async create(data: ICreateAttributes<Product>): Promise<Product> {
    return this.model.create(data);
  }
}
