import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from './entities/product.entity';
import { ProductsRepository } from './products.repository';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  providers: [ProductsResolver, ProductsService, ProductsRepository],
  imports: [SequelizeModule.forFeature([Product])],
  exports: [SequelizeModule.forFeature([Product]), ProductsService],
})
export class ProductsModule {}
