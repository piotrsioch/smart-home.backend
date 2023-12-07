import { GenericRepository, SortOrder } from '@smart-home.backend/libs/common';
import { BaseSensorEntity } from '../entities/base-sensor.entity';
import { findLatestData, IBaseSensorRepository } from '../../../../application';
import { FindOneOptions, Repository } from 'typeorm';

export class BaseSensorRepository<T extends BaseSensorEntity>
  extends GenericRepository<T>
  implements IBaseSensorRepository
{
  constructor(repository: Repository<T>) {
    super(repository);
  }

  async findLatestData(data: findLatestData): Promise<T> {
    const { sensorId } = data;

    const options: FindOneOptions = {
      where: { sensorId },
      order: {
        createdAt: SortOrder.ASC,
      },
    };

    return await this._repository.findOne(options);
  }
}
