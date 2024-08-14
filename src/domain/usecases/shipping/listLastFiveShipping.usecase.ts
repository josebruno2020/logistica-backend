import { ShippingResponseDto } from 'src/presentation/shipping/dtos/create-shipping-response.dto';

export interface IListLastFiveShippingUseCase {
  execute(): Promise<ShippingResponseDto[]>;
}

export const IListLastFiveShippingUseCase = Symbol(
  'IListLastFiveShippingUseCase',
);
