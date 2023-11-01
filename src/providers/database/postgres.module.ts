import { Module } from '@nestjs/common';

import { PostgresService as DatabaseService } from './services';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class PostgresModule {}
