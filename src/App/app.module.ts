import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseService } from '../providers/database';

import { UsersController } from '../models/users/users.controller';
import { UsersService } from '../models/users/users.service';
import { UsersRepository } from '../models/users/users.repository';

const envFileDefault = '.env.dev';
const envFileObj = {
  dev: '.env.dev',
  test: '.env.test',
  prod: '.env.prod',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFileObj[process.env.NODE_ENV] || envFileDefault,
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, DatabaseService, UsersService, UsersRepository],
})
export class AppModule {}
