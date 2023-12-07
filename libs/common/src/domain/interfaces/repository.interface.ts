import { DeepPartial as TypeOrmDeepPartial } from 'typeorm';
import { SortOrder } from '@smart-home.backend/libs/common';

export type DeepPartial<T> = TypeOrmDeepPartial<T>;

export type PaginationOutput<T> = {
  items: T[];
  total: number;
};

export interface IPaginationOptions {
  page: number;
  limit: number;
  orderField?: string;
  orderDirection?: SortOrder;
  search?: string;
  searchFields?: string[];
}

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
