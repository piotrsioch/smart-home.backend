import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { RoomListQueryInput } from './room-list.types';
import { Room } from '../../../../domain';
import { IRoomRepository } from '../../contracts';
import { alarmSearchField } from '../../../sensors/alarm/queries/alarm-list/alarm-list.types';

export class RoomListQuery implements IQuery {
  constructor(public readonly input: RoomListQueryInput) {}
}

@QueryHandler(RoomListQuery)
export class RoomListQueryHandler implements IQueryHandler<RoomListQuery, PaginationOutput<Room>> {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(query: RoomListQuery): Promise<PaginationOutput<Room>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.roomRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields: alarmSearchField,
      page,
      limit,
    });
  }
}
