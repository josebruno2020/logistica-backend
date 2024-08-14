import { Test, TestingModule } from '@nestjs/testing';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { IShippingResultRepository } from 'src/domain/repositories/shipping-result.repository';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { ListLastFiveShippingUseCase } from './listLastFiveShipping.usecase';

describe('ListLastFiveShippingUseCase', () => {
  let useCase: ListLastFiveShippingUseCase;
  let shippingRepository: IShippingRepository;
  let shippingResultRepository: IShippingResultRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListLastFiveShippingUseCase,
        {
          provide: IShippingRepository,
          useValue: {
            listLastFive: jest.fn(),
          },
        },
        {
          provide: IShippingResultRepository,
          useValue: {
            listByShippingId: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ListLastFiveShippingUseCase>(
      ListLastFiveShippingUseCase,
    );
    shippingRepository = module.get<IShippingRepository>(IShippingRepository);
    shippingResultRepository = module.get<IShippingResultRepository>(
      IShippingResultRepository,
    );
  });

  it('should return the last five shippings with correct operators', async () => {
    const mockShippings: Shipping[] = [
      new Shipping(),
      new Shipping(),
      new Shipping(),
      new Shipping(),
      new Shipping(),
    ];

    const mockResults: ShippingResult[] = [
      new ShippingResult(),
      new ShippingResult(),
    ];

    jest
      .spyOn(shippingRepository, 'listLastFive')
      .mockResolvedValue(mockShippings);
    jest
      .spyOn(shippingResultRepository, 'listByShippingId')
      .mockResolvedValue(mockResults);
    jest.spyOn(useCase, 'getFasterResult').mockReturnValue(mockResults[0]);
    jest.spyOn(useCase, 'getCheaperResult').mockReturnValue(mockResults[1]);

    const result = await useCase.execute();

    expect(result).toHaveLength(5);
    result.forEach((res, index) => {
      expect(res.shipping).toBe(mockShippings[index]);
      expect(res.fasterOperator).toBe(mockResults[0]);
      expect(res.cheaperOperator).toBe(mockResults[1]);
    });
  });

  it('should return an empty array if there are no shippings', async () => {
    jest.spyOn(shippingRepository, 'listLastFive').mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});
