import { InjectRepository } from '@nestjs/typeorm';
import { Operator } from 'src/domain/entities/operator.entity';
import { IOperatorRepository } from 'src/domain/repositories/operator.repository';
import { Repository } from 'typeorm';
import { BaseTypeOrmRepository } from './base-typeorm.repository';

export class OperatorTypeOrmRepository
  extends BaseTypeOrmRepository<Operator>
  implements IOperatorRepository
{
  constructor(
    @InjectRepository(Operator)
    private readonly operatorRepository: Repository<Operator>,
  ) {
    super(operatorRepository);
  }
}
