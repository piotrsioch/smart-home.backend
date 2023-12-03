// export type DeepPartial<T> = T extends object
//   ? {
//       [P in keyof T]?: DeepPartial<T[P]>;
//     }
//   : T;

import { DeepPartial as TypeOrmDeepPartial } from 'typeorm';

export type DeepPartial<T> = TypeOrmDeepPartial<T>;

export interface IGenericRepository<T> {
  add(entity: T): Promise<T>;
  remove(entity: T): Promise<void>;
  update(entity: T): Promise<T>;
  findOne(criteria: DeepPartial<T>): Promise<T | undefined>;
  findOneById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}

export interface IModelRepository<T> {
  add(model: T): Promise<T>;
  remove(model: T): Promise<void>;
  update(model: T): Promise<T>;
  findOne(criteria: DeepPartial<T>): Promise<T | undefined>;
  findOneById(id: string): Promise<T | undefined>;
  findAll(): Promise<T[]>;
}

export abstract class IGenericRepository<T> implements IGenericRepository<T> {}
