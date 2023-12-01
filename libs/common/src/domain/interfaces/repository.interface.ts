export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface IGenericRepository<T> {
  add(entity: T): Promise<T>;
  remove(entity: T): Promise<void>;
  update(entity: T): Promise<T>;
  findOne(criteria: DeepPartial<T>): Promise<T | undefined>;
  findOneById(id: string): Promise<T | undefined>;
  findALl(): Promise<T[]>;
}

export interface IModelRepository<T> {
    add(entity: T): Promise<T>;
    remove(entity: T): Promise<void>;
    update(entity: T): Promise<T>;
    findOne(criteria: DeepPartial<T>): Promise<T | undefined>;
    findOneById(id: string): Promise<T | undefined>;
    findALl(): Promise<T[]>;
}

export abstract class IGenericRepository<T> implements IGenericRepository<T> {}
