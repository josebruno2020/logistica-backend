import { Module } from '@nestjs/common';
import { ICreateAddressUseCase } from 'src/domain/usecases/address/createAddress.usecase';
import { InfraModule } from 'src/infra/infra.module';
import { CreateAddressUseCase } from './create/createAddress.usecase';

const createAddress = {
  provide: ICreateAddressUseCase,
  useClass: CreateAddressUseCase,
};

@Module({
  imports: [InfraModule],
  providers: [createAddress],
  exports: [createAddress],
})
export class AddressModule {}
