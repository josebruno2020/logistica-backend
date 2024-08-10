import { InjectRepository } from '@nestjs/typeorm';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class ShippingTypeOrmRepository
  extends BaseTypeOrmRepository<Shipping>
  implements IShippingRepository
{
  constructor(
    @InjectRepository(Shipping)
    private readonly shippingRepository: Repository<Shipping>,
  ) {
    super(shippingRepository);
  }
}
