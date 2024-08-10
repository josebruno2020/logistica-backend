import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity('operators')
export class Operator extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'bigint' })
  cubicFactor: number;

  @Column({ type: 'decimal' })
  lessHundred: number;

  @Column({ type: 'decimal' })
  hundredToFiveHundred: number;

  @Column({ type: 'decimal' })
  moreFiveHundred: number;

  @Column({ type: 'integer' })
  deliveryTimeLessHundred: number;

  @Column({ type: 'integer' })
  deliveryTimeHundredToFiveHundred: number;

  @Column({ type: 'integer' })
  deliveryTimeMoreFiveHundred: number;

  calculationOperatorCubicValue({ height, width, length }: Product): number {
    const cubicValue = (height * width * length) / this.cubicFactor;
    const minCubicValueAllowed = 6;

    return cubicValue < minCubicValueAllowed
      ? minCubicValueAllowed
      : cubicValue;
  }

  calculationTotalCost(distance: number, cubicValue: number): number {
    if (distance <= 100) {
      return this.formatTotalCost(cubicValue * this.lessHundred);
    }
    if (distance > 100 && distance <= 500) {
      return this.formatTotalCost(cubicValue * this.hundredToFiveHundred);
    }
    return this.formatTotalCost(cubicValue * this.moreFiveHundred);
  }

  calculationTotalDeliveryTimeInDays(distance: number): number {
    if (distance <= 100) {
      return this.deliveryTimeLessHundred;
    }
    if (distance > 100 && distance <= 500) {
      return this.deliveryTimeHundredToFiveHundred;
    }
    return this.deliveryTimeMoreFiveHundred;
  }

  private formatTotalCost(totalCost: number): number {
    return parseFloat(totalCost.toFixed(2));
  }
}
