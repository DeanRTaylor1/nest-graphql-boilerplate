import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'products', timestamps: true, underscored: true })
export class Product extends Model {
  @Field(() => Int)
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Field()
  @Column(DataType.STRING)
  name: string;

  @Field()
  @Column(DataType.TEXT)
  description: string;

  @Field(() => Float)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @Field(() => Int)
  @Column(DataType.INTEGER)
  quantity: number;

  @Field()
  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Field()
  @UpdatedAt
  @Column({ type: DataType.DATE })
  updatedAt: Date;
}
