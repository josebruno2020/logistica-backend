import { Test, TestingModule } from '@nestjs/testing';
import { IGetResponse, IHttp } from 'src/domain/adapters/http.adapter';
import { Address } from 'src/domain/entities/address.entity';
import { AdapterException } from 'src/domain/exceptions/adapter-exception';
import { GoogleGeocodingAdapter } from './google-geocoding.adapter';
import { mockResponse } from './tests-helper';

describe('GoogleGeocodingAdapter', () => {
  let geocodingAdapter: GoogleGeocodingAdapter;
  let httpAdapter: IHttp;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoogleGeocodingAdapter,
        {
          provide: IHttp,
          useValue: {
            httpGet: jest.fn(),
          },
        },
      ],
    }).compile();

    geocodingAdapter = module.get<GoogleGeocodingAdapter>(
      GoogleGeocodingAdapter,
    );
    httpAdapter = module.get<IHttp>(IHttp);
  });

  // Testes serão adicionados aqui
  it('should return lat and long when geolocation is successful', async () => {
    // Arrange
    const address: Address = Object.assign(new Address(), {
      street: 'Street',
      number: '123',
      neighborhood: 'Neighborhood',
      city: 'City',
      state: 'State',
      postalCode: '12345-678',
    });

    jest.spyOn(httpAdapter, 'httpGet').mockResolvedValue(mockResponse);

    // Act
    const result = await geocodingAdapter.getGeoLocationByAddress(address);

    // Assert
    expect(result).toEqual({
      lat: -23.55052,
      long: -46.633308,
    });
  });

  it('should throw AdapterException if geolocation fails', async () => {
    const address: Address = Object.assign(new Address(), {
      street: 'Street',
      number: '123',
      neighborhood: 'Neighborhood',
      city: 'City',
      state: 'State',
      postalCode: '12345-678',
    });

    const mockResponseError: IGetResponse<GoogleGeocodingResponse> = {
      status: 200,
      body: {
        status: 'ERROR',
        results: [],
      },
    };

    jest.spyOn(httpAdapter, 'httpGet').mockResolvedValue(mockResponseError);

    // Act & Assert
    await expect(
      geocodingAdapter.getGeoLocationByAddress(address),
    ).rejects.toBeInstanceOf(AdapterException);
  });
});
