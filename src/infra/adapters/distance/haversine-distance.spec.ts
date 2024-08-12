import { IDistanceResponse } from 'src/domain/adapters/distance.adapter';
import { Address } from 'src/domain/entities/address.entity';
import { HaversineDistanceAdapter } from './haversine-distance.adapter';

describe('HaversineDistanceAdapter', () => {
  let haversineDistanceAdapter: HaversineDistanceAdapter;

  beforeEach(() => {
    haversineDistanceAdapter = new HaversineDistanceAdapter();
  });

  it('should calculate the correct distance between two addresses successfully', async () => {
    const addressFrom: Address = Object.assign(new Address(), {
      lat: -23.55052,
      long: -46.633308,
    });

    const addressTo: Address = Object.assign(new Address(), {
      lat: -22.9068467,
      long: -43.1728965,
    });

    const result: IDistanceResponse =
      await haversineDistanceAdapter.calculateDistanceInKmBetweenAddresses(
        addressFrom,
        addressTo,
      );

    expect(result.distance).toBeCloseTo(360.75, 2);
  });

  it('should correctly convert degrees to radians', () => {
    const degrees = 180;

    const radians = haversineDistanceAdapter['degreesToRadians'](degrees);

    expect(radians).toBeCloseTo(Math.PI, 5);
  });

  it('should return 0 distance when both addresses are the same', async () => {
    const address: Address = Object.assign(new Address(), {
      lat: -23.55052,
      long: -46.633308,
    });

    const result: IDistanceResponse =
      await haversineDistanceAdapter.calculateDistanceInKmBetweenAddresses(
        address,
        address,
      );

    expect(result.distance).toBe(0);
  });
});
