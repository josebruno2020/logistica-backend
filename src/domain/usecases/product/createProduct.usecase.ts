import { Product } from 'src/domain/entities/product.entity';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';

export interface ICreateProductUseCase {
  execute(data: CreateProductDto): Promise<Product>;
}

export const ICreateProductUseCase = Symbol('ICreateProductUseCase');
