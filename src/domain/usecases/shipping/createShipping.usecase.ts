import { CreateShippingDto } from 'src/presentation/shipping/dtos/create-shipping.dto';
import { CreatedShippingPresenter } from 'src/presentation/shipping/presenters/created-shipping.presenter';

export interface ICreateShippingUseCase {
  execute(data: CreateShippingDto): Promise<CreatedShippingPresenter>;
}

export const ICreateShippingUseCase = Symbol('ICreateShippingUseCase');
