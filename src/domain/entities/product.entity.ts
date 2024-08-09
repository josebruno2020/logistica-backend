import { PrimaryGeneratedColumn } from 'typeorm';

export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  height: number;

  width: number;

  length: number;
}
