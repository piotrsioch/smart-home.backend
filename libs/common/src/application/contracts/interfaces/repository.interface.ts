import { DeepPartial as TypeOrmDeepPartial } from 'typeorm';
import { IPaginationOptions, PaginationOutput } from '@smart-home.backend/libs/common';

export type DeepPartial<T> = TypeOrmDeepPartial<T>;

export interface IGenericRepository<T> {
  add(entity: T): Promise<T>;

  remove(entity: T): Promise<void>;

  update(entity: T): Promise<T>;

  findOne(criteria: DeepPartial<T>): Promise<T | undefined>;

  findOneById(id: string): Promise<T | undefined>;

  findAll(): Promise<T[]>;

  getPaginatedData(options: IPaginationOptions): Promise<PaginationOutput<any>>;
}

export abstract class IGenericRepository<T> implements IGenericRepository<T> {}
