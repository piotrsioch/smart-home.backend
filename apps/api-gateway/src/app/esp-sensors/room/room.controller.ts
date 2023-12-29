import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CreateRoomInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  EditRoomInputDto,
  IdInputDto,
  mapObjectToDto,
  PaginationOutput,
  RoomDto,
  RoomListInputDto,
  RoomSensorInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
  SuccessDto,
} from '@smart-home.backend/libs/common';

@ApiTags('Room')
@UseFilters(CustomExceptionFilter)
@Controller('/room')
export class RoomController {
  constructor(private client: CustomClientProxy) {}

  @ApiOkResponsePaginated(RoomDto)
  @Get('/list')
  async roomList(@Query() input: RoomListInputDto): Promise<PaginationOutput<RoomDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ROOM_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<RoomDto>, result);
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Get('/get-by-id')
  async getRoomById(@Query() input: IdInputDto): Promise<RoomDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_ROOM_BY_ID,
      data: input,
    });

    return mapObjectToDto(RoomDto, result);
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Post('/create-room')
  async createRoom(@Body() input: CreateRoomInputDto): Promise<RoomDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CREATE_ROOM,
      data: input,
    });

    return mapObjectToDto(RoomDto, result);
  }

  @ApiResponse({ status: 200, type: SuccessDto })
  @Post('/delete-room')
  async deleteRoom(@Body() input: IdInputDto): Promise<SuccessDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.DELETE_ROOM,
      data: input,
    });

    return mapObjectToDto(SuccessDto, result);
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Post('/edit-room')
  async editRoom(@Body() input: EditRoomInputDto): Promise<RoomDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.EDIT_ROOM,
      data: input,
    });

    return mapObjectToDto(RoomDto, result);
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Post('/assign-sensor-to-room')
  async assignSensorToRoom(@Body() input: RoomSensorInputDto): Promise<RoomDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ASSIGN_SENSOR_TO_ROOM,
      data: input,
    });

    return mapObjectToDto(RoomDto, result);
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Post('/remove-sensor-from-room')
  async removeSensorFromRoom(@Body() input: RoomSensorInputDto): Promise<RoomDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.REMOVE_SENSOR_FROM_ROOM,
      data: input,
    });

    return mapObjectToDto(RoomDto, result);
  }
}
