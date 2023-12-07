import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IGenericRepository, IPaginationOptions } from '../../domain';

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

  async getPaginatedData(options: IPaginationOptions): Promise<[T[], number]> {
    const { page, limit, orderField, orderDirection, search } = options;
    const query: any = {};
    const order: any = {};

    const currentPage = page >= 1 ? page : 1;

    const skip = (currentPage - 1) * limit;

    if (search) {
      query['$text'] = { $search: search };
    }

    if (orderField && orderDirection) {
      order[orderField] = orderDirection === 'ASC' ? 1 : -1;
    }

    const [results, total] = await this._repository.findAndCount({
      where: query,
      take: limit,
      skip: skip,
      order: order,
    });

    return [results, total];
  }
}
