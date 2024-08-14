import { Shipping } from '../entities/shipping.entity';
import { IBaseRepository } from './base.repository';

export interface IShippingRepository extends IBaseRepository<Shipping> {
  listLastFive(): Promise<Shipping[]>;
}

export const IShippingRepository = Symbol('IShippingRepository');
