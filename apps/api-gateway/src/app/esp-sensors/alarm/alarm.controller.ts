import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AlarmDto,
  ApiOkResponsePaginated,
  CustomClientProxy,
  CustomExceptionFilter,
  mapObjectToDto,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import {
  AlarmListInputDto,
  ChangeAlarmStateInputDto,
  GetAlarmStateInputDto,
} from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Alarm')
@UseFilters(CustomExceptionFilter)
@Controller('/alarm')
export class AlarmController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: AlarmDto })
  @Post('/change-state')
  async changeAlarmState(@Body() input: ChangeAlarmStateInputDto): Promise<AlarmDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CHANGE_ALARM_STATE,
      data: input,
    });

    return mapObjectToDto(AlarmDto, result);
  }

  @ApiResponse({ status: 200, type: AlarmDto })
  @Get('/get-state')
  async getAlarmState(@Query() input: GetAlarmStateInputDto): Promise<AlarmDto> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_ALARM_STATE,
      data: input,
    });

    return mapObjectToDto(AlarmDto, result);
  }

  @ApiOkResponsePaginated(AlarmDto)
  @Get('/list')
  async alarmList(@Query() input: AlarmListInputDto): Promise<PaginationOutput<AlarmDto>> {
    const result = await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ALARM_LIST,
      data: input,
    });

    return mapObjectToDto(PaginationOutput<AlarmDto>, result);
  }
}
