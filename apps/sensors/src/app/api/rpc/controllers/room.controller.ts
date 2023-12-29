import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateRoomInputDto,
  EditRoomInputDto,
  IdInputDto,
  mapEntityToDto,
  PaginationOutput,
  RoomDto,
  RoomListInputDto,
  RoomSensorInputDto,
  SensorsCommunicationEnum,
  SuccessDto,
} from '@smart-home.backend/libs/common';
import { GetRoomByIdQuery } from '../../../application/room/queries';
import { RoomListQuery } from '../../../application/room/queries';
import {
  AssignSensorToRoomCommand,
  CreateRoomCommand,
  DeleteRoomCommand,
  EditRoomCommand,
  RemoveSensorFromRoomCommand,
} from '../../../application/room/commands';

@Controller()
export class RoomController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.GET_ROOM_BY_ID)
  async getRoomById(@Payload() payload: IdInputDto): Promise<RoomDto> {
    const { id } = payload;

    const query = new GetRoomByIdQuery({ id });

    const result = await this.queryBus.execute<GetRoomByIdQuery>(query);

    return mapEntityToDto(RoomDto, result);
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

    const result = await this.queryBus.execute<RoomListQuery>(query);

    return mapEntityToDto(PaginationOutput<RoomDto>, result);
  }

  @MessagePattern(SensorsCommunicationEnum.CREATE_ROOM)
  async createRoom(@Payload() payload: CreateRoomInputDto): Promise<RoomDto> {
    const { name, roomType, description } = payload;

    const command = new CreateRoomCommand({ name, roomType, description });

    const result = await this.commandBus.execute<CreateRoomCommand>(command);

    return mapEntityToDto(RoomDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.DELETE_ROOM)
  async deleteRoom(@Payload() payload: IdInputDto): Promise<SuccessDto> {
    const { id: roomId } = payload;

    const command = new DeleteRoomCommand({ roomId });

    return await this.commandBus.execute<DeleteRoomCommand>(command);
  }

  @MessagePattern(SensorsCommunicationEnum.ASSIGN_SENSOR_TO_ROOM)
  async assignSensorToRoom(@Payload() payload: RoomSensorInputDto): Promise<RoomDto> {
    const { sensorId, roomId } = payload;

    const command = new AssignSensorToRoomCommand({ sensorId, roomId });

    const result = await this.commandBus.execute<AssignSensorToRoomCommand>(command);

    return mapEntityToDto(RoomDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.EDIT_ROOM)
  async editRoom(@Payload() payload: EditRoomInputDto): Promise<RoomDto> {
    const { id, name, roomType, description } = payload;

    const command = new EditRoomCommand({ id, name, roomType, description });

    const result = await this.commandBus.execute<EditRoomCommand>(command);

    return mapEntityToDto(RoomDto, result);
  }

  @MessagePattern(SensorsCommunicationEnum.REMOVE_SENSOR_FROM_ROOM)
  async removeSensorFromRoom(@Payload() payload: RoomSensorInputDto): Promise<RoomDto> {
    const { sensorId, roomId } = payload;

    const command = new RemoveSensorFromRoomCommand({ sensorId, roomId });

    const result = await this.commandBus.execute<RemoveSensorFromRoomCommand>(command);

    return mapEntityToDto(RoomDto, result);
  }
}
