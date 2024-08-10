import { Test, TestingModule } from '@nestjs/testing';
import { Product } from 'src/domain/entities/product.entity';
import { IProductRepository } from 'src/domain/repositories/product.repository';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';
import { CreateProductUseCase } from './createProduct.usecase';

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let productRepository: IProductRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: IProductRepository,
          useValue: {
            createEntity: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateProductUseCase>(CreateProductUseCase);
    productRepository = module.get<IProductRepository>(IProductRepository);
  });

  it('Should create an product successfully', async () => {
    const createProductDto: CreateProductDto = {
      height: 10.0,
      length: 5,
      width: 7.95,
    };

    const expectedProduct = new Product();
    expectedProduct.height = createProductDto.height;
    expectedProduct.length = createProductDto.length;
    expectedProduct.width = createProductDto.width;

    jest
      .spyOn(productRepository, 'createEntity')
      .mockResolvedValue(expectedProduct);

    const result = await useCase.execute(createProductDto);

    expect(result).toEqual(expectedProduct);
    expect(productRepository.createEntity).toHaveBeenCalledWith(
      expectedProduct,
    );
  });
});
