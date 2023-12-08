import { Body, Controller, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  AddSmokeSensorDataInputDto,
  CustomClientProxy,
  CustomExceptionFilter,
  SensorsCommunicationEnum,
  ServiceEnum,
  SmokeSensorDto,
} from '@smart-home.backend/libs/common';

@UseFilters(CustomExceptionFilter)
@Controller('/smoke-sensor')
export class SmokeSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addSmokeSensorData(
    @Body(new ValidationPipe({ transform: true })) input: AddSmokeSensorDataInputDto,
  ): Promise<SmokeSensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_SMOKE_DATA,
      data: input,
    });
  }
}
