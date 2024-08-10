import { Address } from 'src/domain/entities/address.entity';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';

export interface ICreateAddressUseCase {
  execute(data: CreateAddressDto): Promise<Address>;
}

export const ICreateAddressUseCase = Symbol('ICreateAddressUseCase');
