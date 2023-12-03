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

export abstract class IGenericRepository<T> implements IGenericRepository<T> {}
