import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateRoomInputDto,
  RoomDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';

@Controller()
export class SensorController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  // @MessagePattern(SensorsCommunicationEnum.CREATE_ROOM)
  // async createRoom(@Payload() payload: CreateRoomInputDto): Promise<RoomDto> {}
}
