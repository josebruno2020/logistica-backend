import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters/adapters.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AdaptersModule, DatabaseModule],
  exports: [AdaptersModule, DatabaseModule],
})
export class InfraModule {}
