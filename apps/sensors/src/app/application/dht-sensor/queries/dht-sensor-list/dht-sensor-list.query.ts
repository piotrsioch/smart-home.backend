import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { DhtSensor } from '../../../../domain';
import { IDhtSensorRepository } from '../../../contracts';
import { DhtSensorListQueryInput, searchFields } from './dht-sensor-list.types';

export class DhtSensorListQuery implements IQuery {
  constructor(public readonly input: DhtSensorListQueryInput) {}
}

@QueryHandler(DhtSensorListQuery)
export class DhtSensorListQueryHandler
  implements IQueryHandler<DhtSensorListQuery, PaginationOutput<DhtSensor>>
{
  constructor(private readonly dhtSensorRepository: IDhtSensorRepository) {}

  async execute(query: DhtSensorListQuery): Promise<PaginationOutput<DhtSensor>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.dhtSensorRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields,
      page,
      limit,
    });
  }
}
