import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import {
  CustomClientProxy,
  CustomExceptionFilter,
  GetSensorByIdInputDto,
  PaginationOutput,
  ReedSwitchListInputDto,
  SensorDto,
  SensorListInputDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/sensors')
export class SensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/create')
  async createSensor(@Body() input: SensorListInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SENSOR_LIST,
      data: input,
    });
  }

  @Get('/list')
  async sensorList(@Body() input: ReedSwitchListInputDto): Promise<PaginationOutput<SensorDto>> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.SENSOR_LIST,
      data: input,
    });
  }

  @Get('/get-by-id')
  async getById(@Body() input: GetSensorByIdInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.SENSORS, {
      pattern: SensorsCommunicationEnum.GET_SENSOR_BY_ID,
      data: input,
    });
  }

  @Post('test')
  async test() {
    return await this.client.sendTo(ServiceEnum.NOTIFICATIONS, {
      pattern: 'notification-test',
    });
  }
}
