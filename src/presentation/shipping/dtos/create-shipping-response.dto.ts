import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';

export class CreateShippingResponseDto {
  shipping: Shipping;
  fasterOperator: ShippingResult;
  cheaperOperator: ShippingResult;
}
