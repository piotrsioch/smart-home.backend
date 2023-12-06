import { Body, Controller, Post } from '@nestjs/common';
import {
  AddPirSensorDataInputDto,
  CustomClientProxy,
  PirSensorDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@Controller('/pir-sensor')
export class PirSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addPirSensorData(@Body() input: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_PIR_DATA,
      data: input,
    });
  }
}
