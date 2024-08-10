import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/domain/entities/address.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class AddressTypeOrmRepository
  extends BaseTypeOrmRepository<Address>
  implements IAddressRepository
{
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {
    super(addressRepository);
  }
}
