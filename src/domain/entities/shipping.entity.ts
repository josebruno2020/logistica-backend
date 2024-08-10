import { Column, Entity, ManyToOne } from 'typeorm';
import { Address } from './address.entity';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity('shippings')
export class Shipping extends BaseEntity {
  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Address)
  collectionAddress: Address;

  @ManyToOne(() => Address)
  deliveryAddress: Address;

  @Column({ type: 'decimal' })
  distance: number;
}
