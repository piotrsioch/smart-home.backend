import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AlarmDto,
  CustomClientProxy,
  CustomExceptionFilter,
  LightDto,
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
import { ApiOkResponsePaginated } from '@smart-home.backend/libs/common/src/api/decorators/api-ok-response-paginated';

@ApiTags('Alarm')
@UseFilters(CustomExceptionFilter)
@Controller('/alarm')
export class AlarmController {
  constructor(private client: CustomClientProxy) {}

  @ApiResponse({ status: 200, type: AlarmDto })
  @Post('/change-state')
  async changeLightState(@Body() input: ChangeAlarmStateInputDto): Promise<AlarmDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CHANGE_ALARM_STATE,
      data: input,
    });
  }

  @ApiResponse({ status: 200, type: AlarmDto })
  @Get('/get-state')
  async getAlarmState(@Query() input: GetAlarmStateInputDto): Promise<AlarmDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_ALARM_STATE,
      data: input,
    });
  }

  @ApiOkResponsePaginated(AlarmDto)
  @Get('/list')
  async alarmList(@Query() input: AlarmListInputDto): Promise<PaginationOutput<AlarmDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ALARM_LIST,
      data: input,
    });
  }
}
