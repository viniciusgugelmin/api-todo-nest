import { Injectable } from '@nestjs/common';

import { Responses } from '../../../common/responses';

import { HashingService } from '../../../providers/hashing';

import { UsersRepository } from '../repositories';
import { UsersDTOS } from '../dtos';
import { UsersEntities } from '../entities';
import { UsersInterfaces } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(
    signUpDTO: UsersDTOS.SignUpDTO,
  ): Promise<Responses.Either<UsersInterfaces.SignUpErrors, UsersEntities.User>> {
    const isEmailAlreadyInUse = await this.usersRepository.getByProperty({
      property: 'email',
      value: signUpDTO.email,
    });

    if (isEmailAlreadyInUse) {
      return Responses.makeLeft<UsersInterfaces.SignUpErrors>('EMAIL_ALREADY_IN_USE');
    }

    const passwordHashed = await this.hashingService.hash({
      value: signUpDTO.password,
    });

    return Responses.makeRight(
      await this.usersRepository.createOne({
        data: {
          ...signUpDTO,
          password: passwordHashed,
        },
      }),
    );
  }

  async signIn(
    signInDTO: UsersDTOS.SignInDTO,
  ): Promise<Responses.Either<UsersInterfaces.SignInErrors, UsersEntities.User>> {
    const user = await this.usersRepository.getByProperty({
      property: 'email',
      value: signInDTO.email,
    });

    if (!user) {
      return Responses.makeLeft<UsersInterfaces.SignInErrors>('USER_NOT_FOUND');
    }

    const isPasswordValid = await this.hashingService.compare({
      value: signInDTO.password,
      hash: user.password,
    });

    if (!isPasswordValid) {
      return Responses.makeLeft<UsersInterfaces.SignInErrors>('INVALID_PASSWORD');
    }

    return Responses.makeRight(user);
  }

  async getAll(): Promise<Responses.Either<void, UsersEntities.User[]>> {
    return Responses.makeRight(await this.usersRepository.getAll());
  }
}
