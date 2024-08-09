import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  postalCode: string;

  state: string;

  city: string;

  neighborhood: string;

  street: string;

  number: string;
}
