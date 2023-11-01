import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Entities } from '../../../common/entities';

import { UsersService } from '../services';

import { UsersEntities } from '../entities';

import { UsersDTOS } from '../dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: 'Create user',
    type: UsersEntities.User,
  })
  @ApiBadRequestResponse({
    description: 'Error: Bad Request',
    type: Entities.ValidatonError,
  })
  @Post()
  async signUp(@Body() createDTO: UsersDTOS.CreateDTO) {
    return this.usersService.signUp(createDTO);
  }

  @ApiOkResponse({
    description: 'Get all users',
    type: [UsersEntities.User],
  })
  @Get()
  async getAll() {
    return this.usersService.getAll();
  }
}
