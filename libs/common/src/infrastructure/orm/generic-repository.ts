import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { IGenericRepository } from '../../domain';

export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(private readonly _repository: Repository<T>) {}

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
}
