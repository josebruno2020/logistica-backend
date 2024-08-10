import { Product } from '../entities/product.entity';
import { IBaseRepository } from './base.repository';

export interface IProductRepository extends IBaseRepository<Product> {}

export const IProductRepository = Symbol('IProductRepository');
