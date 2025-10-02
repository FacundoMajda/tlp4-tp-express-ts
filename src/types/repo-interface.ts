export interface IRepository<T> {
  find(filter: object): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: object): Promise<T>;
  updateById(id: number, data: object): Promise<T>;
  deleteById(id: number): Promise<void>;
}
