import { ShippingResult } from '../entities/shipping-result.entity';
import { IBaseRepository } from './base.repository';

export interface IShippingResultRepository
  extends IBaseRepository<ShippingResult> {
  listByShippingId(shippingId: string): Promise<ShippingResult[]>;
  getCheaperByShippingId(shippingId: string): Promise<ShippingResult | null>;
  getFasterByShippingId(shippingId: string): Promise<ShippingResult | null>;
}

export const IShippingResultRepository = Symbol('IShippingResultRepository');
