import { UsersInterfaces } from '../interfaces';

export namespace UsersEntities {
  export class User implements UsersInterfaces.User {
    id: number;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }
}
