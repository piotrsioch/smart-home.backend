import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import {
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  IdInputDto,
  PaginationOutput,
  RoomDto,
  RoomListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@ApiTags('Room')
@UseFilters(CustomExceptionFilter)
@Controller('/room')
export class RoomController {
  constructor(private client: CustomClientProxy) {}

  @ApiOkResponsePaginated(RoomDto)
  @Get('/list')
  async reedSwitchList(@Query() input: RoomListInputDto): Promise<PaginationOutput<RoomDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ROOM_LIST,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: RoomDto })
  @Get('/get-by-id')
  async getLatestData(@Query() input: IdInputDto): Promise<RoomDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_ROOM_BY_ID,
      data: input,
    });
  }
}
