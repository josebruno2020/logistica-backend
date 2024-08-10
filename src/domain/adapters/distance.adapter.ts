import { Address } from '../entities/address.entity';

export interface IDistanceResponse {
  distance: number;
}

export interface IDistance {
  calculateDistanceInKmBetweenAddresses(
    addressFrom: Address,
    addressTo: Address,
  ): Promise<IDistanceResponse>;
}

export const IDistance = Symbol('IDistance');
