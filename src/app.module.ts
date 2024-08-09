import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UseCasesModule } from './domain/usecases/usecases.module';
import { AdaptersModule } from './infra/adapters/adapters.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AdaptersModule,
    DatabaseModule,
    UseCasesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
