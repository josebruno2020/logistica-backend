import { Module } from '@nestjs/common';
import { IDistance } from 'src/domain/adapters/distance.adapter';
import { IGeocoding } from 'src/domain/adapters/geocoding.adapter';
import { IHttp } from 'src/domain/adapters/http.adapter';
import { HaversineDistanceAdapter } from './distance/haversine-distance.adapter';
import { GoogleGeocodingAdapter } from './geocoding/google-geocoding.adapter';
import { AxiosHttpAdapter } from './http/axios-http.adapter';

const httpAdapter = {
  provide: IHttp,
  useClass: AxiosHttpAdapter,
};

const geocodingAdapter = {
  provide: IGeocoding,
  useClass: GoogleGeocodingAdapter,
};

const distanceAdapter = {
  provide: IDistance,
  useClass: HaversineDistanceAdapter,
};

@Module({
  providers: [httpAdapter, geocodingAdapter, distanceAdapter],
  exports: [httpAdapter, geocodingAdapter, distanceAdapter],
})
export class AdaptersModule {}
