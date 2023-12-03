import { Injectable } from '@nestjs/common';

import { Pagination } from '@modules/base/pagination.type';

import { CreateUserInput } from './dto/create-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create(createUserInput);
  }

  async findAll({ offset, limit }: Pagination, attributes?: Array<string>) {
    return this.usersRepository.getAll({ offset, limit, attributes });
  }

  async findOne(id: number) {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  //   async update(id: number, _updateUserDto: UpdateUserDto) {
  //     return `This action updates a #${id} user`;
  //   }

  async remove(id: number) {
    return this.usersRepository.destroyById(id);
  }
}
