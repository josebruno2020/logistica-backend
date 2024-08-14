import { InjectRepository } from '@nestjs/typeorm';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class ShippingResultTypeOrmRepository
  extends BaseTypeOrmRepository<ShippingResult>
  implements IShippingResultRepository
{
  constructor(
    @InjectRepository(ShippingResult)
    private readonly shippingResultRepository: Repository<ShippingResult>,
  ) {
    super(shippingResultRepository);
  }

  listByShippingId(shippingId: string): Promise<ShippingResult[]> {
    return this.shippingResultRepository.find({
      where: {
        shipping: { id: shippingId },
      },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        operator: true,
      },
    });
  }
}
