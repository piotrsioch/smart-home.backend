import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { ReedSwitch } from '../../../../../domain';
import { IReedSwitchRepository } from '../../../contracts';
import { ReedSwitchListQueryInput, reedSearchFields } from './reed-switch-list.types';

export class ReedSwitchListQuery implements IQuery {
  constructor(public readonly input: ReedSwitchListQueryInput) {}
}

@QueryHandler(ReedSwitchListQuery)
export class ReedSwitchListQueryHandler
  implements IQueryHandler<ReedSwitchListQuery, PaginationOutput<ReedSwitch>>
{
  constructor(private readonly reedSwitchRepository: IReedSwitchRepository) {}

  async execute(query: ReedSwitchListQuery): Promise<PaginationOutput<ReedSwitch>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.reedSwitchRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: reedSearchFields,
      page,
      limit,
    });
  }
}
