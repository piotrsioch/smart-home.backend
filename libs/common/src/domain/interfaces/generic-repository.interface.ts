export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface IGenericRepository<T> {
  create(entity: T): Promise<T>;
  remove(entity: T): Promise<void>;
  update(entity: T): Promise<T>;
  findOne(criteria: DeepPartial<T>): Promise<T | undefined>;
  findOneById(id: string): Promise<T | undefined>;
  findALl(): Promise<T[]>;
}

export abstract class IGenericRepository<T> implements IGenericRepository<T> {}
