export interface BaseRepository<T> {
  createEntity(entity: T): Promise<T>;
  listAll(): Promise<T>;
}
