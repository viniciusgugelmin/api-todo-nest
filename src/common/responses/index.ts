import {ApiProperty} from "@nestjs/swagger";
import {HttpException, HttpStatus} from "@nestjs/common";

export namespace Responses {
  type Left<T> = {
    left: T;
    right?: never;
  };

  type Right<T> = {
    left?: never;
    right: T;
  };

  export type Either<L, R> = Left<L> | Right<R>;

  export const isLeft = <L, R>(e: Either<L, R>): boolean =>
    e.left !== undefined;

  export const isRight = <L, R>(e: Either<L, R>): boolean =>
    e.right !== undefined;

  export const makeLeft = <T>(value: T): Left<T> => ({left: value});

  export const makeRight = <T>(value: T): Right<T> => ({right: value});

  export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>;

  export const unwrapEither: UnwrapEither = <L, R>({
                                                     left,
                                                     right,
                                                   }: Either<L, R>) => {
    if (right !== undefined && left !== undefined) {
      throw new HttpException(
        `Received both left and right values at runtime when opening an Either\nLeft: ${JSON.stringify(
          left
        )}\nRight: ${JSON.stringify(right)}`, HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (left !== undefined) {
      return left as NonNullable<L>;
    }

    if (right !== undefined) {
      return right as NonNullable<R>;
    }

    throw new HttpException(
      `Received no left or right values at runtime when opening Either`, HttpStatus.INTERNAL_SERVER_ERROR
    );
  };

  export const unknownErrorMessage = 'An unknown error occurred';

  export function makeResponse<T>(data: T, statusCode: number): { data: T, statusCode: number } {
    return {
      data,
      statusCode,
    };
  }
}
