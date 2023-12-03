import { join } from 'path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

import { ConfigModule } from '@config/config.module';
import { env } from '@modules/config/env';
import { Product } from '@modules/products/entities/product.entity';
import { RabbitMQModule } from '@modules/rabbitmq/rabbitmq.module';
import {
  CreateUserInput,
  UserObjectType,
} from '@modules/users/dto/create-user.input';
import { User } from '@modules/users/user.entity';
import { UsersResolver } from '@modules/users/users.resolver';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlApolloErrorFilter } from './filters/exceptions.filter';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: env.db.dialect as Dialect,
      host: env.db.host,
      port: Number(env.db.port),
      username: env.db.username,
      password: env.db.password,
      database: env.db.database,
      models: [User, Product],
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersResolver,
    UserObjectType,
    CreateUserInput,
    {
      provide: APP_FILTER,
      useClass: GqlApolloErrorFilter,
    },
  ],
})
export class AppModule {}
