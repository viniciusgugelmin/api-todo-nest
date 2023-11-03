import {Injectable} from '@nestjs/common';

import {Repositories} from '../../../common/repositories';

import {DatabaseService} from '../../../providers/database';

@Injectable()
export class UsersRepository extends Repositories.AbstractRepository {
  constructor(database: DatabaseService) {
    super(database, 'user');
  }
}
