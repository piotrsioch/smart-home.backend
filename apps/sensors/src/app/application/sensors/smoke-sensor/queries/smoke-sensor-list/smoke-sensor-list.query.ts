import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { SmokeSensor } from '../../../../../domain';
import { ISmokeSensorRepository } from '../../../contracts';
import { SmokeSensorListQueryInput, smokeSearchFields } from './smoke-sensor-list.types';

export class SmokeSensorListQuery implements IQuery {
  constructor(public readonly input: SmokeSensorListQueryInput) {}
}

@QueryHandler(SmokeSensorListQuery)
export class SmokeSensorListQueryHandler
  implements IQueryHandler<SmokeSensorListQuery, PaginationOutput<SmokeSensor>>
{
  constructor(private readonly smokeSensorRepository: ISmokeSensorRepository) {}

  async execute(query: SmokeSensorListQuery): Promise<PaginationOutput<SmokeSensor>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.smokeSensorRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: smokeSearchFields,
      page,
      limit,
    });
  }
}
