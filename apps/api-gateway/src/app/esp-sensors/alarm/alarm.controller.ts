import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  AlarmDto,
  CustomClientProxy,
  CustomExceptionFilter,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';
import { ChangeAlarmStateInputDto } from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';

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
}
