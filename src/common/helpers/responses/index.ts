namespace Responses {
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

  export const makeLeft = <T>(value: T): Left<T> => ({ left: value });

  export const makeRight = <T>(value: T): Right<T> => ({ right: value });
}
