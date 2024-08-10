import { Module } from '@nestjs/common';
import { ICreateProductUseCase } from 'src/domain/usecases/product/createProduct.usecase';
import { InfraModule } from 'src/infra/infra.module';
import { CreateProductUseCase } from './create/createProduct.usecase';

const createProduct = {
  provide: ICreateProductUseCase,
  useClass: CreateProductUseCase,
};

@Module({
  imports: [InfraModule],
  providers: [createProduct],
  exports: [createProduct],
})
export class ProductModule {}
