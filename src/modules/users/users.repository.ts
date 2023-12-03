import { InjectModel } from '@nestjs/sequelize';

import { BaseRepository } from '@modules/base/base.repository';
import { ICreateAttributes } from '@modules/base/global.types';

import { User } from './user.entity';

export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User)
    userModel: typeof User,
  ) {
    super(userModel);
  }

  async create(data: ICreateAttributes<User>): Promise<User> {
    return this.model.create(data);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } });
  }
}
