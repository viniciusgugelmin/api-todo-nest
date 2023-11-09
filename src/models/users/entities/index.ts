import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { UsersInterfaces } from '../interfaces';

export namespace UsersEntities {
  export class User implements UsersInterfaces.User {
    @ApiProperty()
    id: number;

    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    deletedAt: Date;
  }

  export class SignInResponse implements UsersInterfaces.SignInResponse {
    @ApiProperty()
    user: User;

    @ApiProperty()
    token: string;
  }
}
