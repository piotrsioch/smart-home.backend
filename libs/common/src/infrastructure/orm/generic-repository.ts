import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IGenericRepository, IPaginationOptions } from '../../domain';
import { PaginationOutput } from '../../../src';

export class GenericRepository<T> implements IGenericRepository<T> {
  protected readonly _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  async add(entity: T): Promise<T> {
    return await this._repository.save(entity);
  }

  async remove(entity: T): Promise<void> {
    await this._repository.remove(entity);
  }

  async update(entity: T): Promise<T> {
    return await this._repository.save(entity);
  }

  async findOne(criteria: DeepPartial<T>): Promise<T | undefined> {
    // @ts-ignore
    return await this._repository.findOne(criteria);
  }

  async findOneById(id: string): Promise<T | undefined> {
    const options: FindOneOptions = {
      where: { _id: id },
    };

    return await this._repository.findOne(options);
  }

  async findAll(): Promise<T[]> {
    return await this._repository.find();
  }

  async getPaginatedData(options: IPaginationOptions): Promise<PaginationOutput<T>> {
    const { page, limit, orderField, orderDirection, search, searchFields } = options;

    const query: any = {};
    const order: any = {};

    const skip = page > 0 ? page * limit : 0;

    if (search && searchFields) {
      query.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
    }

    if (orderField) {
      order[orderField] = orderDirection === 'ASC' ? 1 : -1;
    }

    const [results, total] = await this._repository.findAndCount({
      where: query,
      take: limit,
      skip,
      order,
    });

    return {
      items: results,
      total,
    };
  }
}
