import {Injectable} from '@nestjs/common';

import {Responses} from "../../../common/responses";

import {HashingService} from "../../../providers/hashing";

import {UsersRepository} from '../repositories';
import {UsersDTOS} from '../dtos';
import {UsersEntities} from "../entities";
import {UsersInterfaces} from "../interfaces";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository, private readonly hashingService: HashingService) {
  }

  async signUp(createDTO: UsersDTOS.CreateDTO): Promise<Responses.Either<UsersInterfaces.SignUpErrors, UsersEntities.User>> {
    const isEmailAlreadyInUse = await this.usersRepository.getByProperty({
      property: 'email',
      value: createDTO.email,
    });

    if (isEmailAlreadyInUse) {
      return Responses.makeLeft<UsersInterfaces.SignUpErrors>('EMAIL_ALREADY_IN_USE');
    }

    const passwordHashed = await this.hashingService.hash({
      value: createDTO.password,
    });

    return Responses.makeRight(
      await this.usersRepository.createOne({
        data: {
          ...createDTO,
          password: passwordHashed,
        }
      })
    );
  }

  async getAll(): Promise<Responses.Either<void, UsersEntities.User[]>> {
    return Responses.makeRight(await this.usersRepository.getAll());
  }
}
