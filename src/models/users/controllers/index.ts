import {Body, Controller, Get, HttpException, HttpStatus, Post, Res} from '@nestjs/common';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags,} from '@nestjs/swagger';
import {Response} from 'express';

import {Entities} from '../../../common/entities';
import {Responses} from "../../../common/responses";

import {UsersService} from '../services';
import {UsersEntities} from '../entities';
import {UsersDTOS} from '../dtos';
import {UsersHandlers} from "../handlers";
import {UsersInterfaces} from "../interfaces";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {
  }

  @ApiCreatedResponse({
    description: 'Create user',
    type: UsersEntities.User,
  })
  @ApiBadRequestResponse({
    description: 'Error: Email already in use',
    type: Entities.BaseError,
  })
  @Post()
  async signUp(@Res() res: Response, @Body() createDTO: UsersDTOS.CreateDTO) {
    const signUpEither = await this.usersService.signUp(createDTO);

    if (Responses.isRight(signUpEither)) {
      const user = Responses.unwrapEither(signUpEither);

      return res.status(201).json(Responses.makeResponse(user, 201));
    }

    const error = Responses.unwrapEither(signUpEither);
    const errorObj = UsersHandlers.handleSignUpError(error as UsersInterfaces.SignUpErrors);

    throw new HttpException(errorObj.message, errorObj.code);
  }

  @ApiOkResponse({
    description: 'Get all users',
    type: [UsersEntities.User],
  })
  @Get()
  async getAll() {
    const getAllEither = await this.usersService.getAll();

    const users = Responses.unwrapEither(getAllEither);

    return Responses.makeResponse(users, 200);
  }
}
