import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/domain/entities/address.entity';
import { Operator } from 'src/domain/entities/operator.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import { IOperatorRepository } from 'src/domain/repositories/operator.repository';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { AddressTypeOrmRepository } from './repositories/address-typeorm.repository';
import { OperatorTypeOrmRepository } from './repositories/operator-typeorm.repository';
import { ProductTypeOrmRepository } from './repositories/product-typeorm.repository';
import { ShippingResultTypeOrmRepository } from './repositories/shipping-result-typeorm.repository';
import { ShippingTypeOrmRepository } from './repositories/shipping-typeorm.repository';

const addressRepository = {
  provide: IAddressRepository,
  useClass: AddressTypeOrmRepository,
};

const productRepository = {
  provide: IProductRepository,
  useClass: ProductTypeOrmRepository,
};

const shippingRepository = {
  provide: IShippingRepository,
  useClass: ShippingTypeOrmRepository,
};

const shippingResultRepository = {
  provide: IShippingResultRepository,
  useClass: ShippingResultTypeOrmRepository,
};

const operatorRepository = {
  provide: IOperatorRepository,
  useClass: OperatorTypeOrmRepository,
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
        synchronize: false,
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
  providers: [
    addressRepository,
    productRepository,
    shippingRepository,
    shippingResultRepository,
    operatorRepository,
  ],
  exports: [
    addressRepository,
    productRepository,
    shippingRepository,
    shippingResultRepository,
    operatorRepository,
  ],
})
export class DatabaseModule {}
