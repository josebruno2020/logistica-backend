import { ShippingResult } from 'src/domain/entities/shipping-result.entity';
import { Shipping } from 'src/domain/entities/shipping.entity';

export class ShippingResponseDto {
  shipping: Shipping;
  fasterOperator: ShippingResult;
  cheaperOperator: ShippingResult;
}
