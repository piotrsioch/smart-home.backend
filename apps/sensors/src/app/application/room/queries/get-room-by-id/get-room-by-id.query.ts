import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';
import { IRoomRepository } from '../../contracts';
import { Room } from '../../../../domain';

export type GetRoomByIdQueryInput = {
  id: string;
};

export class GetRoomByIdQuery implements IQuery {
  constructor(public readonly input: GetRoomByIdQueryInput) {}
}

@QueryHandler(GetRoomByIdQuery)
export class GetRoomByIdQueryHandler implements IQueryHandler<GetRoomByIdQuery, Room> {
  constructor(private readonly roomRepository: IRoomRepository) {}

  async execute(query: GetRoomByIdQuery): Promise<Room> {
    const { id } = query.input;

    const room = await this.roomRepository.findOneById(id);

    if (!room) {
      throw new CustomRpcException('Room with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    return room;
  }
}
