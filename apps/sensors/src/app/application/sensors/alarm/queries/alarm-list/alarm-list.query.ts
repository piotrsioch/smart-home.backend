import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { Alarm } from '../../../../../domain';
import { IAlarmRepository } from '../../../contracts';
import { AlarmListQueryInput, alarmSearchField } from './alarm-list.types';

export class AlarmListQuery implements IQuery {
  constructor(public readonly input: AlarmListQueryInput) {}
}

@QueryHandler(AlarmListQuery)
export class AlarmListQueryHandler
  implements IQueryHandler<AlarmListQuery, PaginationOutput<Alarm>>
{
  constructor(private readonly alarmRepository: IAlarmRepository) {}

  async execute(query: AlarmListQuery): Promise<PaginationOutput<Alarm>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.alarmRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: alarmSearchField,
      page,
      limit,
    });
  }
}
