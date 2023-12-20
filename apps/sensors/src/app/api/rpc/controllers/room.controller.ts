import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  IdInputDto,
  PaginationOutput,
  RoomDto,
  RoomListInputDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { GetRoomByIdQuery } from '../../../application/room/queries';
import { RoomListQuery } from '../../../application/room/queries';

@Controller()
export class RoomController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.GET_ROOM_BY_ID)
  async getRoomById(@Payload() payload: IdInputDto): Promise<RoomDto> {
    const { id } = payload;

    const query = new GetRoomByIdQuery({ id });
    return await this.queryBus.execute<GetRoomByIdQuery>(query);
  }

  @MessagePattern(SensorsCommunicationEnum.ROOM_LIST)
  async roomList(@Payload() payload: RoomListInputDto): Promise<PaginationOutput<RoomDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new RoomListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });
    return await this.queryBus.execute<RoomListQuery>(query);
  }
}
