import { WhereOptions } from 'sequelize';
import { ModelCtor, Model } from 'sequelize-typescript';

import { ICreateAttributes } from './global.types';

export abstract class BaseRepository<M extends Model> {
  protected model: ModelCtor<M>;

  constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  async findById(id: number, attributes?: Array<string>): Promise<M> {
    return this.model.findByPk(id, { attributes });
  }

  async getAll({
    offset,
    limit,
    attributes,
  }: {
    offset: number;
    limit: number;
    attributes: Array<string>;
  }): Promise<{ count: number; items: Array<M> }> {
    const { count, rows } = await this.model.findAndCountAll({
      attributes,
      offset,
      limit,
      raw: true,
    });

    return {
      items: rows,
      count,
    };
  }

  async destroyById(id: number): Promise<number> {
    const where: WhereOptions = { id };
    return this.model.destroy({ where });
  }

  abstract create(data: ICreateAttributes<M['_attributes']>): Promise<M>;
}
