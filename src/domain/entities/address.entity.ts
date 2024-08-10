import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('addresses')
export class Address extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  postalCode: string;

  @Column({ type: 'varchar', length: 10 })
  state: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 100 })
  neighborhood: string;

  @Column({ type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 10 })
  number: string;

  @Column({ type: 'bigint' })
  lat: number;

  @Column({ type: 'bigint' })
  long: number;
}
