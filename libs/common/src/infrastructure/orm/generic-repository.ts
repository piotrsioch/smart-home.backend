import { DeepPartial, IGenericRepository } from '../../domain';
import { EntityManager, Repository } from 'typeorm';

export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(
    private readonly _entity: new () => T,
    private readonly _entityManager: EntityManager,
  ) {}

  private get repository(): Repository<T> {
    return this._entityManager.getRepository(this._entity);
  }

  async add(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async remove(entity: T): Promise<void> {
    await this.repository.remove(entity);
  }

  async update(entity: T): Promise<T> {
    return await this.repository.save(entity);
  }

  async findOne(criteria: DeepPartial<T>): Promise<T | undefined> {
    return await this.repository.findOne(criteria);
  }

  async findOneById(id: string): Promise<T | undefined> {
    // @ts-ignore
    return await this.repository.findOne(id);
  }

  async findALl(): Promise<T[]> {
    return await this.repository.find();
  }
}
