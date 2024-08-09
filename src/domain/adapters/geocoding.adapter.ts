import { Address } from '../entities/address.entity';

export interface IGeocodingByAddress {
  lat: number;
  long: number;
}

export interface IGeocoding {
  getGeoLocationByAddress(address: Address): Promise<IGeocodingByAddress>;
}

export const IGeocoding = Symbol('IGeocoding');
