import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import {
  AddSmokeSensorDataInputDto,
  CustomClientProxy,
  SensorsCommunicationEnum,
  ServiceEnum,
  SmokeSensorDto,
} from '@smart-home.backend/libs/common';

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
