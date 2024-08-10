import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('operators')
export class Operator extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // TODO as colunas
}
