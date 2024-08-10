import { IBaseRepository } from 'src/domain/repositories/base.repository';
import { Repository } from 'typeorm';

export class BaseTypeOrmRepository<T> implements IBaseRepository<T> {
  constructor(private readonly repository: Repository<any>) {}

  createEntity(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  listAll(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<T> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
