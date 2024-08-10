import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Operator } from './operator.entity';

@Entity('shipping_result')
export class ShippingResult extends BaseEntity {
  @ManyToOne(() => Operator)
  operator: Operator;

  @Column({ type: 'decimal' })
  totalConst: number;

  @Column({ type: 'integer' })
  deliveryTime: number;
}
