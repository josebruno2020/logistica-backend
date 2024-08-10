import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ type: 'decimal' })
  height: number;

  @Column({ type: 'decimal' })
  width: number;

  @Column({ type: 'decimal' })
  length: number;
}
