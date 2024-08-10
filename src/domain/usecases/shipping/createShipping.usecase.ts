import { CreateShippingResponseDto } from 'src/presentation/shipping/dtos/create-shipping-response.dto';
import { CreateShippingDto } from 'src/presentation/shipping/dtos/create-shipping.dto';

export interface ICreateShippingUseCase {
  execute(data: CreateShippingDto): Promise<CreateShippingResponseDto>;
}

export const ICreateShippingUseCase = Symbol('ICreateShippingUseCase');
