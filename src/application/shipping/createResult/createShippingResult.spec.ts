import { Test, TestingModule } from '@nestjs/testing';
import { Product } from 'src/domain/entities/product.entity';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IOperatorRepository } from 'src/domain/repositories/operator.repository';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { CreateShippingResultDto } from 'src/presentation/shipping/dtos/create-shipping-result.dto';
import { CreateShippingResultUseCase } from './createShippingResult.usecase';

describe('CreateShippingResultUseCase', () => {
  let useCase: CreateShippingResultUseCase;
  let operatorRepository: IOperatorRepository;
  let shippingResultRepository: IShippingResultRepository;

  const mockOperator = {
    calculationOperatorCubicValue: jest.fn(),
    calculationTotalCost: jest.fn(),
    calculationTotalDeliveryTimeInDays: jest.fn(),
  };

  const mockShippingResult = new ShippingResult();
  mockShippingResult.totalCost = 100;
  mockShippingResult.deliveryTime = 2;

  const mockOperators = [mockOperator];
  const mockShipping = new Shipping();
  mockShipping.distance = 100;

  const mockProduct = new Product();

  const mockCreateShippingResultDto: CreateShippingResultDto = {
    shipping: mockShipping,
    product: mockProduct,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateShippingResultUseCase,
        {
          provide: IOperatorRepository,
          useValue: {
            listAll: jest.fn().mockResolvedValue(mockOperators),
          },
        },
        {
          provide: IShippingResultRepository,
          useValue: {
            createEntity: jest.fn().mockResolvedValue(mockShippingResult),
            getFasterByShippingId: jest
              .fn()
              .mockResolvedValue(mockShippingResult),
            getCheaperByShippingId: jest
              .fn()
              .mockResolvedValue(mockShippingResult),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateShippingResultUseCase>(
      CreateShippingResultUseCase,
    );
    operatorRepository = module.get<IOperatorRepository>(IOperatorRepository);
    shippingResultRepository = module.get<IShippingResultRepository>(
      IShippingResultRepository,
    );
  });

  it('should call operatorRepository.listAll once', async () => {
    await useCase.execute(mockCreateShippingResultDto);
    expect(operatorRepository.listAll).toHaveBeenCalledTimes(1);
  });

  it('should call calculation methods for each operator', async () => {
    await useCase.execute(mockCreateShippingResultDto);
    expect(mockOperator.calculationOperatorCubicValue).toHaveBeenCalledWith(
      mockProduct,
    );
    expect(mockOperator.calculationTotalCost).toHaveBeenCalledWith(
      mockShipping.distance,
      undefined,
    );
    expect(
      mockOperator.calculationTotalDeliveryTimeInDays,
    ).toHaveBeenCalledWith(mockShipping.distance);
  });

  it('should call shippingResultRepository.createEntity for each result', async () => {
    await useCase.execute(mockCreateShippingResultDto);
    expect(shippingResultRepository.createEntity).toHaveBeenCalledTimes(
      mockOperators.length,
    );
  });

  it('should return faster and cheaper operator results', async () => {
    const result = await useCase.execute(mockCreateShippingResultDto);
    expect(result).toHaveProperty('fasterOperator');
    expect(result).toHaveProperty('cheaperOperator');
  });
});
