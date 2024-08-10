import { ShippingResult } from 'src/domain/entities/shipping-result.entity';

export class CreateShippingResultResponse {
  cheaperOperator: ShippingResult;
  fasterOperator: ShippingResult;
}
