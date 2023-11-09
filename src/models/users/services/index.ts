import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { Responses } from '../../../common/responses';

import { HashingService } from '../../../providers/hashing';
import { TokenService } from '../../../providers/token';

import { UsersRepository } from '../repositories';
import { UsersDTOS } from '../dtos';
import { UsersEntities } from '../entities';
import { UsersInterfaces } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
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
    response: Response,
  ): Promise<Responses.Either<UsersInterfaces.SignInErrors, UsersEntities.SignInResponse>> {
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

    const token = await this.tokenService.generate({
      payload: {
        id: user.id,
        email: user.email,
      },
    });

    response.cookie('token', token);

    return Responses.makeRight({
      user,
      token,
    });
  }

  async getMe(request: Request): Promise<Responses.Either<UsersInterfaces.GetMeErrors, UsersEntities.User>> {
    const userToken = request.cookies.token;

    if (!userToken) {
      return Responses.makeLeft('USER_NOT_FOUND');
    }

    try {
      let user = (await this.tokenService.verify({
        token: userToken,
      })) as Partial<UsersEntities.User>;

      user = await this.usersRepository.getByProperty({
        property: 'id',
        value: user.id,
      });

      return Responses.makeRight(user as UsersEntities.User);
    } catch (error) {
      return Responses.makeLeft('USER_NOT_FOUND');
    }
  }

  async getAll(): Promise<Responses.Either<void, UsersEntities.User[]>> {
    return Responses.makeRight(await this.usersRepository.getAll());
  }
}
