import { DatabaseService } from '../../providers/database';
import { Prisma } from '@prisma/client';
import { UsersInterfaces } from '../../models/users';

export namespace Repositories {
  export class AbstractRepository {
    constructor(
      protected readonly database: DatabaseService,
      protected readonly entity: 'user',
    ) {}

    async getAll() {
      return this.database[this.entity].findMany({});
    }

    async getOne({ id }: { id: number }) {
      return this.database[this.entity].findFirst({
        where: {
          id,
        },
      });
    }

    async getByProperty({ property, value }: { property: keyof UsersInterfaces.User; value: any }) {
      return this.database[this.entity].findFirst({
        where: {
          [property]: value,
        },
      });
    }

    async createOne({ data }: { data: any }) {
      return this.database[this.entity].create({
        data,
      });
    }

    async updateOne({ id, data }: { id: number; data: any }) {
      return this.database[this.entity].update({
        where: {
          id,
        },
        data,
      });
    }

    async deleteOne({ id }: { id: number }) {
      return this.database[this.entity].update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    }
  }
}
