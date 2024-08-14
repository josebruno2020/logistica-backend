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

  listLastFive(): Promise<Shipping[]> {
    return this.shippingRepository.find({
      order: { createdAt: 'DESC' },
      take: 5,
      relations: {
        product: true,
        collectionAddress: true,
        deliveryAddress: true,
      },
    });
  }
}
