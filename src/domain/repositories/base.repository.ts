export interface IBaseRepository<T> {
  createEntity(entity: T): Promise<T>;
  listAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
}
