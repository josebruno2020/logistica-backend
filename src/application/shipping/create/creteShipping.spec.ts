import { Test, TestingModule } from '@nestjs/testing';
import { IDistance } from 'src/domain/adapters/distance.adapter';
import { Address } from 'src/domain/entities/address.entity';
import { Product } from 'src/domain/entities/product.entity';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';
import { AdapterException } from 'src/domain/exceptions/adapter-exception';
import { IShippingRepository } from 'src/domain/repositories/shipping.repository';
import { ICreateAddressUseCase } from 'src/domain/usecases/address/createAddress.usecase';
import { ICreateProductUseCase } from 'src/domain/usecases/product/createProduct.usecase';
import { ICreateShippingResultUseCase } from 'src/domain/usecases/shipping/createShippingResult.usecase';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';
import { CreateProductDto } from 'src/presentation/product/dtos/create-product.dto';
import { CreateShippingUseCase } from './createShipping.usecase';

describe('CreateShippingUseCase', () => {
  let createShippingUseCase: CreateShippingUseCase;
  let createAddressUseCase: ICreateAddressUseCase;
  let createProductUseCase: ICreateProductUseCase;
  let distanceAdapter: IDistance;
  let shippingRepository: IShippingRepository;
  let createShippingResultUseCase: ICreateShippingResultUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateShippingUseCase,
        {
          provide: ICreateAddressUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: ICreateProductUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: IDistance,
          useValue: {
            calculateDistanceInKmBetweenAddresses: jest.fn(),
          },
        },
        {
          provide: IShippingRepository,
          useValue: {
            createEntity: jest.fn(),
          },
        },
        {
          provide: ICreateShippingResultUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    createShippingUseCase = module.get<CreateShippingUseCase>(
      CreateShippingUseCase,
    );
    createAddressUseCase = module.get<ICreateAddressUseCase>(
      ICreateAddressUseCase,
    );
    createProductUseCase = module.get<ICreateProductUseCase>(
      ICreateProductUseCase,
    );
    distanceAdapter = module.get<IDistance>(IDistance);
    shippingRepository = module.get<IShippingRepository>(IShippingRepository);
    createShippingResultUseCase = module.get<ICreateShippingResultUseCase>(
      ICreateShippingResultUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create shipping successfully', async () => {
    const collectionAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };
    const deliveryAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };
    const productDto: CreateProductDto = {
      height: 10.0,
      length: 5,
      width: 7.95,
    };

    const distance = 10;

    jest
      .spyOn(createAddressUseCase, 'execute')
      .mockResolvedValueOnce(new Address());
    jest
      .spyOn(createAddressUseCase, 'execute')
      .mockResolvedValueOnce(new Address());
    jest
      .spyOn(createProductUseCase, 'execute')
      .mockResolvedValueOnce(new Product());
    jest
      .spyOn(distanceAdapter, 'calculateDistanceInKmBetweenAddresses')
      .mockResolvedValueOnce({ distance });
    jest
      .spyOn(shippingRepository, 'createEntity')
      .mockResolvedValueOnce(new Shipping());

    jest.spyOn(createShippingResultUseCase, 'execute').mockResolvedValueOnce({
      cheaperOperator: new ShippingResult(),
      fasterOperator: new ShippingResult(),
    });

    const result = await createShippingUseCase.execute({
      collectionAddress: collectionAddressDto,
      deliveryAddress: deliveryAddressDto,
      product: productDto,
    });

    expect(result).toEqual({
      shipping: expect.any(Shipping),
      cheaperOperator: expect.any(ShippingResult),
      fasterOperator: expect.any(ShippingResult),
    });
    expect(createAddressUseCase.execute).toHaveBeenCalledTimes(2);
    expect(createProductUseCase.execute).toHaveBeenCalledTimes(1);
    expect(
      distanceAdapter.calculateDistanceInKmBetweenAddresses,
    ).toHaveBeenCalledTimes(1);
    expect(shippingRepository.createEntity).toHaveBeenCalledTimes(1);
    expect(createShippingResultUseCase.execute).toHaveBeenCalledTimes(1);
  });

  it('should throw if create address fails', async () => {
    const collectionAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };
    const deliveryAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };
    const productDto: CreateProductDto = {
      height: 10.0,
      length: 5,
      width: 7.95,
    };

    jest
      .spyOn(createAddressUseCase, 'execute')
      .mockRejectedValueOnce(new AdapterException('Error'));

    expect(
      createShippingUseCase.execute({
        collectionAddress: collectionAddressDto,
        deliveryAddress: deliveryAddressDto,
        product: productDto,
      }),
    ).rejects.toBeInstanceOf(AdapterException);
  });
});
