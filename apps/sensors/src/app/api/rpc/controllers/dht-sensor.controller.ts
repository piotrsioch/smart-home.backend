import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern } from '@nestjs/microservices';
import { SensorsCommunicationEnum } from '@smart-home.backend/libs/common';
import { AddDhtSensorCommand } from '../../../application';
import { DhtSensor } from '../../../domain/models';

@Controller()
export class DhtSensorController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_DHT)
  async testAddDht(): Promise<DhtSensor> {
    const command = new AddDhtSensorCommand({
      temperature: '44',
      humidity: '44',
    });

    return await this.commandBus.execute<AddDhtSensorCommand, DhtSensor>(command);
  }
}
