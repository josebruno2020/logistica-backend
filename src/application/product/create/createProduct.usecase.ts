import { Inject } from '@nestjs/common';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { ICreateProductUseCase } from 'src/domain/usecases/product/createProduct.usecase';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';

export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject(IProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute({ height, length, width }: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.height = height;
    product.length = length;
    product.width = width;

    return this.productRepository.createEntity(product);
  }
}
