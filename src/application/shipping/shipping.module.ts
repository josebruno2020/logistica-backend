import { Module } from '@nestjs/common';
import { ICreateShippingUseCase } from 'src/domain/usecases/shipping/createShipping.usecase';
import { ICreateShippingResultUseCase } from 'src/domain/usecases/shipping/createShippingResult.usecase';
import { IListLastFiveShippingUseCase } from 'src/domain/usecases/shipping/listLastFiveShipping.usecase';
import { InfraModule } from 'src/infra/infra.module';
import { AddressModule } from '../address/address.module';
import { ProductModule } from '../product/product.module';
import { CreateShippingUseCase } from './create/createShipping.usecase';
import { CreateShippingResultUseCase } from './createResult/createShippingResult.usecase';
import { ListLastFiveShippingUseCase } from './list/listLastFiveShipping.usecase';

const createShipping = {
  provide: ICreateShippingUseCase,
  useClass: CreateShippingUseCase,
};

const createShippingResult = {
  provide: ICreateShippingResultUseCase,
  useClass: CreateShippingResultUseCase,
};

const listLastFiveShipping = {
  provide: IListLastFiveShippingUseCase,
  useClass: ListLastFiveShippingUseCase,
};

@Module({
  imports: [AddressModule, ProductModule, InfraModule],
  providers: [createShipping, createShippingResult, listLastFiveShipping],
  exports: [createShipping, listLastFiveShipping],
})
export class ShippingModule {}
