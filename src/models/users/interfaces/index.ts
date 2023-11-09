export namespace UsersInterfaces {
  export type User = {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };

  export type SignUpErrors = 'EMAIL_ALREADY_IN_USE';

  export type SignInErrors = 'USER_NOT_FOUND' | 'INVALID_PASSWORD';
}
