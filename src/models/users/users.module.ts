import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database';

import { UsersController } from './controllers';
import { UsersService } from './services';
import { UsersRepository } from './repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [DatabaseModule],
})
export class UsersModule {}
