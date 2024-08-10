import { ApiProperty } from '@nestjs/swagger';
import { ShippingResult } from 'src/domain/entities/shipping-result.entity';

export class ShippingResultPresenter {
  @ApiProperty({ example: '7ce225ea-906c-4ebf-818a-172124c99531' })
  id: string;

  @ApiProperty({ example: 'Operador 1' })
  operatorName: string;

  @ApiProperty({ example: 50.0 })
  totalCost: number;

  @ApiProperty({ example: 5 })
  deliveryTime: number;

  constructor({ id, operator, totalCost, deliveryTime }: ShippingResult) {
    this.id = id;
    this.operatorName = operator.name;
    this.totalCost = totalCost;
    this.deliveryTime = deliveryTime;
  }
}
