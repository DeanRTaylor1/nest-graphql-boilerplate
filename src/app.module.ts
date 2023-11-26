import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@config/config.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { env } from '@modules/config/env';
import { Dialect } from 'sequelize';
import { UsersModule } from './modules/users/users.module';
import { UsersResolver } from '@modules/users/users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ConfigModule,
    SequelizeModule.forRoot({
      dialect: env.db.dialect as Dialect,
      host: env.db.host,
      port: Number(env.db.port),
      username: env.db.username,
      password: env.db.password,
      database: env.db.database,
      models: [],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}