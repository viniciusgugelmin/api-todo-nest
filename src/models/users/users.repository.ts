import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../../providers/database';

@Injectable()
export class UsersRepository {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.user.findMany({});
  }
}
