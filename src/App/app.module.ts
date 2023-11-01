import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers';
import { AppService } from './services';

import { UsersModule } from '../models/users';

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
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
