import { PrimaryGeneratedColumn } from 'typeorm';

export class Operator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  name: string;
}
