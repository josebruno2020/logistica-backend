import { Module } from '@nestjs/common';
import { IGeocoding } from 'src/domain/adapters/geocoding.adapter';
import { IHttp } from 'src/domain/adapters/http.adapter';
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

@Module({
  providers: [httpAdapter, geocodingAdapter],
  exports: [httpAdapter, geocodingAdapter],
})
export class AdaptersModule {}
