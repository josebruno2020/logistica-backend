import { Test, TestingModule } from '@nestjs/testing';
import { IGeocoding } from 'src/domain/adapters/geocoding.adapter';
import { AdapterException } from 'src/domain/exceptions/adapter-exception';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';
import { Address } from '../../../domain/entities/address.entity';
import { IAddressRepository } from '../../../domain/repositories/address.repository';
import { CreateAddressUseCase } from './createAddress.usecase';

describe('CreateAddressUseCase', () => {
  let useCase: CreateAddressUseCase;
  let addressRepository: IAddressRepository;
  let geocodingAdapter: IGeocoding;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAddressUseCase,
        {
          provide: IAddressRepository,
          useValue: {
            createEntity: jest.fn(),
          },
        },
        {
          provide: IGeocoding,
          useValue: {
            getGeoLocationByAddress: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<CreateAddressUseCase>(CreateAddressUseCase);
    addressRepository = module.get<IAddressRepository>(IAddressRepository);
    geocodingAdapter = module.get<IGeocoding>(IGeocoding);
  });

  it('Should create an address with geolocation successfully', async () => {
    const createAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };

    const expectedAddress = new Address();
    expectedAddress.city = createAddressDto.city;
    expectedAddress.neighborhood = createAddressDto.neighborhood;
    expectedAddress.number = createAddressDto.number;
    expectedAddress.postalCode = createAddressDto.postalCode;
    expectedAddress.state = createAddressDto.state;
    expectedAddress.street = createAddressDto.street;
    expectedAddress.lat = 10.0;
    expectedAddress.long = 20.0;

    jest.spyOn(geocodingAdapter, 'getGeoLocationByAddress').mockResolvedValue({
      lat: 10.0,
      long: 20.0,
    });

    jest
      .spyOn(addressRepository, 'createEntity')
      .mockResolvedValue(expectedAddress);

    const result = await useCase.execute(createAddressDto);

    expect(result).toEqual(expectedAddress);
    expect(geocodingAdapter.getGeoLocationByAddress).toHaveBeenCalledWith(
      expect.any(Address),
    );
    expect(addressRepository.createEntity).toHaveBeenCalledWith(
      expectedAddress,
    );
  });

  it('Should throw if geolocation fails', async () => {
    const createAddressDto: CreateAddressDto = {
      city: 'City',
      neighborhood: 'Neighborhood',
      number: '123',
      postalCode: '12345-678',
      state: 'State',
      street: 'Street',
    };
    jest
      .spyOn(geocodingAdapter, 'getGeoLocationByAddress')
      .mockRejectedValue(new AdapterException('Geo failed'));

    await expect(useCase.execute(createAddressDto)).rejects.toBeInstanceOf(
      AdapterException,
    );
  });
});
