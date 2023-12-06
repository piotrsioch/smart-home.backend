import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateSensorInputDto,
  CustomClientProxy,
  SensorDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@Controller('/sensors')
export class SensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/create')
  async addDhtSensorData(@Body() input: CreateSensorInputDto): Promise<SensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.CREATE_SENSOR,
      data: input,
    });
  }
}
