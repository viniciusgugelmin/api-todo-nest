import {Module} from '@nestjs/common';

import {DatabaseModule} from '../../providers/database';

import {UsersController} from './controllers';
import {UsersService} from './services';
import {UsersRepository} from './repositories';
import {HashingModule} from "../../providers/hashing";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [DatabaseModule, HashingModule],
})
export class UsersModule {
}
