import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { Light } from '../../../../../domain';
import { ILightRepository } from '../../../contracts';
import { LightListQueryInput, lightSearchFields } from './light-list.types';

export class LightListQuery implements IQuery {
  constructor(public readonly input: LightListQueryInput) {}
}

@QueryHandler(LightListQuery)
export class LightListQueryHandler
  implements IQueryHandler<LightListQuery, PaginationOutput<Light>>
{
  constructor(private readonly lightRepository: ILightRepository) {}

  async execute(query: LightListQuery): Promise<PaginationOutput<Light>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.lightRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: lightSearchFields,
      page,
      limit,
    });
  }
}
