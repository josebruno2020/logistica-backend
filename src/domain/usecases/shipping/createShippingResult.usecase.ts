import { CreateShippingResultResponse } from 'src/presentation/shipping/dtos/create-shipping-result-response.dto';
import { CreateShippingResultDto } from 'src/presentation/shipping/dtos/create-shipping-result.dto';

export interface ICreateShippingResultUseCase {
  execute(data: CreateShippingResultDto): Promise<CreateShippingResultResponse>;
}

export const ICreateShippingResultUseCase = Symbol(
  'ICreateShippingResultUseCase',
);
