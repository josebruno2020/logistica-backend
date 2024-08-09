import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/domain/entities/address.entity';
import { Operator } from 'src/domain/entities/operator.entity';
import { Product } from 'src/domain/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        schema: configService.get('DB_SCHEMA'),
        autoLoadEntities: true,
        entities: [__dirname + './../**/*.entity{.ts,.js}'],
        logging: configService.get('APP_ENV') === 'local',
        synchronize: true, //TODO mudar
      }),
    }),
    TypeOrmModule.forFeature([Address, Operator, Product]),
  ],
})
export class DatabaseModule {}
