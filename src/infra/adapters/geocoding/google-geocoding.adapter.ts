import { Inject, Injectable } from '@nestjs/common';
import {
  IGeocoding,
  IGeocodingByAddress,
} from 'src/domain/adapters/geocoding.adapter';
import { IHttp } from 'src/domain/adapters/http.adapter';
import { Address } from 'src/domain/entities/address.entity';
import { AdapterException } from 'src/domain/exceptions/adapter-exception';

@Injectable()
export class GoogleGeocodingAdapter implements IGeocoding {
  constructor(
    @Inject(IHttp)
    private readonly httpAdapter: IHttp,
  ) {}

  private BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
  private API_KEY = process.env.GOOGLE_API_KEY;
  private COUNTRY_NAME = 'Brasil';

  async getGeoLocationByAddress(
    address: Address,
  ): Promise<IGeocodingByAddress> {
    const params = this.setAddressToConsult(address);
    console.log(`[GOOGLE_GEOCODING]: ${JSON.stringify(params)}`);
    const { body } = await this.httpAdapter.httpGet<GoogleGeocodingResponse>({
      url: this.BASE_URL,
      queryParams: {
        key: this.API_KEY,
        address: params,
      },
    });

    console.log(`[GOOGLE_GEOCODING]: ${JSON.stringify(body)}`);

    if (body.status !== 'OK' || !body.results.length) {
      throw new AdapterException(
        `Não foi possível geolocalizar o endereço do CEP: ${address.postalCode}`,
      );
    }

    const result = body.results[0];

    return {
      lat: result.geometry.location.lat,
      long: result.geometry.location.lng,
    };
  }

  private setAddressToConsult({
    street,
    number,
    neighborhood,
    city,
    state,
    postalCode,
  }: Address): string {
    return `${street}, ${number} - ${neighborhood},${city} - ${state}, ${postalCode}, ${this.COUNTRY_NAME}`;
  }
}
