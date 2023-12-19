import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { PirSensor } from '../../../../../domain';
import { IPirSensorRepository } from '../../../contracts';
import { PirSensorListQueryInput, pirSearchFields } from './pir-sensor-list.types';

export class PirSensorListQuery implements IQuery {
  constructor(public readonly input: PirSensorListQueryInput) {}
}

@QueryHandler(PirSensorListQuery)
export class PirSensorListQueryHandler
  implements IQueryHandler<PirSensorListQuery, PaginationOutput<PirSensor>>
{
  constructor(private readonly pirSensorRepository: IPirSensorRepository) {}

  async execute(query: PirSensorListQuery): Promise<PaginationOutput<PirSensor>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.pirSensorRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: pirSearchFields,
      page,
      limit,
    });
  }
}
