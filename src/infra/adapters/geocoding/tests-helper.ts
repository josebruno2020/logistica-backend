import { IGetResponse } from 'src/domain/adapters/http.adapter';

export const mockResponse: IGetResponse<GoogleGeocodingResponse> = {
  status: 200,
  body: {
    status: 'OK',
    results: [
      {
        address_components: [
          {
            long_name: '123',
            short_name: '123',
            types: ['street_number'],
          },
          {
            long_name: 'Street',
            short_name: 'St',
            types: ['route'],
          },
          {
            long_name: 'Neighborhood',
            short_name: 'NBHD',
            types: ['neighborhood', 'political'],
          },
          {
            long_name: 'City',
            short_name: 'City',
            types: ['locality', 'political'],
          },
          {
            long_name: 'State',
            short_name: 'ST',
            types: ['administrative_area_level_1', 'political'],
          },
          {
            long_name: '12345-678',
            short_name: '12345-678',
            types: ['postal_code'],
          },
        ],
        formatted_address:
          'Street, 123 - Neighborhood, City - ST, 12345-678, Brasil',
        geometry: {
          location: {
            lat: -23.55052,
            lng: -46.633308,
          },
          location_type: 'ROOFTOP',
          viewport: {
            northeast: {
              lat: -23.55052,
              lng: -46.633308,
            },
            southwest: {
              lat: -23.55052,
              lng: -46.633308,
            },
          },
        },
        place_id: 'ChIJd8BlQ2BZwokRAFUEcm_qrcA',
        plus_code: {
          compound_code: 'VHM3+WF São Paulo, State of São Paulo',
          global_code: '588GVHM3+WF',
        },
        types: ['street_address'],
      },
    ],
  },
};
