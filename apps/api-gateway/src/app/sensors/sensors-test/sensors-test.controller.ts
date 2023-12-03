import { Controller, Get } from '@nestjs/common';
import { SensorsCommunicationEnum, ServiceEnum } from '@smart-home.backend/libs/common/src/domain';
import { CustomClientProxy } from '@smart-home.backend/libs/common';

@Controller('sensors/test')
export class SensorsTestController {
  constructor(private client: CustomClientProxy) {}

  @Get()
  public async test() {
    return this.client.sendTo(ServiceEnum.Sensors, {
      pattern: SensorsCommunicationEnum.ADD_DHT,
    });
  }
}
