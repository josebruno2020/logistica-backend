interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleLocation {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: GoogleLocation;
  southwest: GoogleLocation;
}

interface Geometry {
  location: GoogleLocation;
  location_type: string;
  viewport: Viewport;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
}

interface GoogleGeocodingResponse {
  results: Result[];
  status: string;
}
