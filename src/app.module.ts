import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
