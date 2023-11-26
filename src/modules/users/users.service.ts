import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Pagination } from 'src/decorators/pagination.decorator';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserInput) {
    return this.usersRepository.create(createUserInput);
  }

  async findAll({ offset, limit }: Pagination) {
    return this.usersRepository.getAll({ offset, limit });
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
