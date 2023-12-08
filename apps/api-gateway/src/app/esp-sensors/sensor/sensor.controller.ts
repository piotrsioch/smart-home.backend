import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  CreateSensorInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  SensorDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/sensors')
export class SensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/create')
  async createSensor(@Body() input: CreateSensorInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.CREATE_SENSOR,
      data: input,
    });
  }
}
