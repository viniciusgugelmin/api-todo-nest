import { DatabaseService } from '../../providers/database';
import { Prisma } from '@prisma/client';

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

    async createOne({ data }: { data: Prisma.UserCreateInput }) {
      return this.database[this.entity].create({
        data,
      });
    }

    async updateOne({
      id,
      data,
    }: {
      id: number;
      data: Prisma.UserUpdateInput;
    }) {
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
