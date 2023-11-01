import { Module } from '@nestjs/common';

import { PostgresService as DatabaseService } from './postgres.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class PostgresModule {}
