import { ShippingResult } from '../entities/shipping-result.entity';
import { IBaseRepository } from './base.repository';

export interface IShippingResultRepository
  extends IBaseRepository<ShippingResult> {}

export const IShippingResultRepository = Symbol('IShippingResultRepository');
