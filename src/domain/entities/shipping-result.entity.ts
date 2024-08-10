import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operator } from './operator.entity';
import { Shipping } from './shipping.entity';

@Entity('shipping_result')
export class ShippingResult extends BaseEntity {
  @ManyToOne(() => Shipping)
  shipping: Shipping;

  @ManyToOne(() => Operator)
  operator: Operator;

  @Column({ type: 'decimal' })
  totalCost: number;

  @Column({ type: 'integer' })
  deliveryTime: number;
}
