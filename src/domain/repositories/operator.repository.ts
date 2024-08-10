import { Operator } from '../entities/operator.entity';
import { IBaseRepository } from './base.repository';

export interface IOperatorRepository extends IBaseRepository<Operator> {}

export const IOperatorRepository = Symbol('IOperatorRepository');
