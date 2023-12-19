import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { ISensorRepository } from '../../../contracts';
import { SensorListQueryInput, sensorSearchFields } from './sensor-list.types';
import { Sensor } from '../../../../../domain/models/sensors';

export class SensorListQuery implements IQuery {
  constructor(public readonly input: SensorListQueryInput) {}
}

@QueryHandler(SensorListQuery)
export class SensorListQueryHandler
  implements IQueryHandler<SensorListQuery, PaginationOutput<Sensor>>
{
  constructor(private readonly sensorRepository: ISensorRepository) {}

  async execute(query: SensorListQuery): Promise<PaginationOutput<Sensor>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.sensorRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: sensorSearchFields,
      page,
      limit,
    });
  }
}
