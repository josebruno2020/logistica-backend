import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/domain/entities/address.entity';
import { Operator } from 'src/domain/entities/operator.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { AddressTypeOrmRepository } from './repositories/address-typeorm.repository';
import { ProductTypeOrmRepository } from './repositories/product-typeorm.repository';

const addressRepository = {
  provide: IAddressRepository,
  useClass: AddressTypeOrmRepository,
};

const productRepository = {
  provide: IProductRepository,
  useClass: ProductTypeOrmRepository,
};

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
        entities: [__dirname + './../../**/*.entity{.ts,.js}'],
        logging: configService.get('APP_ENV') === 'local',
        synchronize: true, //TODO mudar
      }),
    }),
    TypeOrmModule.forFeature([
      Address,
      Operator,
      Product,
      Shipping,
      ShippingResult,
    ]),
  ],
  providers: [addressRepository, productRepository],
  exports: [addressRepository, productRepository],
})
export class DatabaseModule {}
