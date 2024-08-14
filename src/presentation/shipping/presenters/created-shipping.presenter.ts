import { ApiProperty } from '@nestjs/swagger';
import { ShippingResponseDto } from '../dtos/create-shipping-response.dto';
import { ShippingResultPresenter } from './shipping-result.presenter';
import { ShippingPresenter } from './shipping.presenter';

export class CreatedShippingPresenter {
  @ApiProperty({ type: ShippingPresenter })
  shipping: ShippingPresenter;

  @ApiProperty({ type: ShippingResultPresenter })
  faster: ShippingResultPresenter;

  @ApiProperty({ type: ShippingResultPresenter })
  cheaper: ShippingResultPresenter;

  constructor({
    shipping,
    fasterOperator,
    cheaperOperator,
  }: ShippingResponseDto) {
    this.shipping = new ShippingPresenter(shipping);
    this.faster = new ShippingResultPresenter(fasterOperator);
    this.cheaper = new ShippingResultPresenter(cheaperOperator);
  }
}
