import { Address } from '../entities/address.entity';
import { IBaseRepository } from './base.repository';

export interface IAddressRepository extends IBaseRepository<Address> {}

export const IAddressRepository = Symbol('IAddressRepository');
