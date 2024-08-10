import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class ProductTypeOrmRepository
  extends BaseTypeOrmRepository<Product>
  implements IProductRepository
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}
