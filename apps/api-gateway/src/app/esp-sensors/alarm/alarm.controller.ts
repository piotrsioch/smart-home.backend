import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import {
  AlarmDto,
  CustomClientProxy,
  CustomExceptionFilter,
  PaginationOutput,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import {
  AlarmListInputDto,
  ChangeAlarmStateInputDto,
  GetAlarmStateInputDto,
} from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';

@UseFilters(CustomExceptionFilter)
@Controller('/alarm')
export class AlarmController {
  constructor(private client: CustomClientProxy) {}

  @Post('/change-state')
  async changeLightState(@Body() input: ChangeAlarmStateInputDto): Promise<AlarmDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.CHANGE_ALARM_STATE,
      data: input,
    });
  }

  @Get('/get-state')
  async getAlarmState(@Query() input: GetAlarmStateInputDto): Promise<AlarmDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_ALARM_STATE,
      data: input,
    });
  }

  @Get('/list')
  async alarmList(@Query() input: AlarmListInputDto): Promise<PaginationOutput<AlarmDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.ALARM_LIST,
      data: input,
    });
  }
}
