import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { ShippingResult } from './shipping-result.entity';

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

  @OneToMany(() => ShippingResult, (result) => result.shipping)
  results: ShippingResult[];
}
