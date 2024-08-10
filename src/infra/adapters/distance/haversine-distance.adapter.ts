import {
  IDistance,
  IDistanceResponse,
} from 'src/domain/adapters/distance.adapter';
import { Address } from 'src/domain/entities/address.entity';

export class HaversineDistanceAdapter implements IDistance {
  private EARTH_RADIUS = 6371;

  async calculateDistanceInKmBetweenAddresses(
    addressFrom: Address,
    addressTo: Address,
  ): Promise<IDistanceResponse> {
    const { lat: lat1, long: long1 } = addressFrom;
    const { lat: lat2, long: long2 } = addressTo;
    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(long2 - long1);

    const haversineFormulaComponent =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const centralAngle =
      2 *
      Math.atan2(
        Math.sqrt(haversineFormulaComponent),
        Math.sqrt(1 - haversineFormulaComponent),
      );
    const distanceInKm = this.EARTH_RADIUS * centralAngle;

    return {
      distance: parseFloat(distanceInKm.toFixed(2)),
    };
  }

  private degreesToRadians(deg: number) {
    return deg * (Math.PI / 180);
  }
}
