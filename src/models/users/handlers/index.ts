import { UsersInterfaces } from '../interfaces';
import { Responses } from '../../../common/responses';
import { HttpStatus } from '@nestjs/common';

export namespace UsersHandlers {
  export function handleSignUpError(error: UsersInterfaces.SignUpErrors): { message: string; code: number } {
    switch (error) {
      case 'EMAIL_ALREADY_IN_USE': {
        return {
          message: 'Email already in use',
          code: HttpStatus.BAD_REQUEST,
        };
      }
      default: {
        return {
          message: Responses.unknownErrorMessage,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
    }
  }

  export function handleSignInError(error: UsersInterfaces.SignInErrors): { message: string; code: number } {
    switch (error) {
      case 'USER_NOT_FOUND':
      case 'INVALID_PASSWORD': {
        return {
          message: 'Invalid email or password',
          code: HttpStatus.BAD_REQUEST,
        };
      }
      default: {
        return {
          message: Responses.unknownErrorMessage,
          code: HttpStatus.INTERNAL_SERVER_ERROR,
        };
      }
    }
  }
}
