import { Inject } from '@nestjs/common';
import { IGeocoding } from 'src/domain/adapters/geocoding.adapter';
import { Address } from 'src/domain/entities/address.entity';
import { IAddressRepository } from 'src/domain/repositories/address.repository';
import { ICreateAddressUseCase } from 'src/domain/usecases/address/createAddress.usecase';
import { CreateAddressDto } from 'src/presentation/address/dtos/create-address.dto';

export class CreateAddressUseCase implements ICreateAddressUseCase {
  constructor(
    @Inject(IAddressRepository)
    private readonly addressRepository: IAddressRepository,
    @Inject(IGeocoding)
    private readonly geocodingAdapter: IGeocoding,
  ) {}

  async execute({
    city,
    neighborhood,
    number,
    postalCode,
    state,
    street,
  }: CreateAddressDto): Promise<Address> {
    const address = new Address();
    address.city = city;
    address.neighborhood = neighborhood;
    address.number = number;
    address.postalCode = postalCode;
    address.state = state;
    address.street = street;

    const { lat, long } =
      await this.geocodingAdapter.getGeoLocationByAddress(address);

    address.lat = lat;
    address.long = long;

    return this.addressRepository.createEntity(address);
  }
}
