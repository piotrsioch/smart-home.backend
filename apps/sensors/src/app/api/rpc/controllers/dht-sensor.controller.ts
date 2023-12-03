import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddDhtSensorDataInputDto,
  DhtSensorDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { AddDhtSensorDataCommand } from "../../../application";

@Controller()
export class DhtSensorController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_DHT_DATA)
  async addDhtData(@Payload() payload: AddDhtSensorDataInputDto): Promise<DhtSensorDto> {
    const { temperature, sensorId, humidity } = payload;

    const command = new AddDhtSensorDataCommand({
      temperature,
      sensorId,
      humidity,
    });

    return await this.commandBus.execute<AddDhtSensorDataCommand>(command);
  }
}
