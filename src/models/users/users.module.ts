import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [DatabaseModule],
})
export class UsersModule {}
