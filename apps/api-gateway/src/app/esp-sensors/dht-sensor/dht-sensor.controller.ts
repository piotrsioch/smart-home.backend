import { Body, Controller, Post } from '@nestjs/common';
import {
  AddDhtSensorDataInputDto,
  CustomClientProxy,
  DhtSensorDto,
  SensorsCommunicationEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

@Controller('/dht-sensor')
export class DhtSensorController {
  constructor(private client: CustomClientProxy) {}

  @Post('/add-data')
  async addDhtSensorData(@Body() input: AddDhtSensorDataInputDto): Promise<DhtSensorDto> {
    return await this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_DHT_DATA,
      data: input,
    });
  }
}
