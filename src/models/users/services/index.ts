import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories';

import { UsersDTOS } from '../dtos';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(createDTO: UsersDTOS.CreateDTO) {
    return this.usersRepository.createOne({
      data: createDTO,
    });
  }

  async getAll() {
    return this.usersRepository.getAll();
  }
}
