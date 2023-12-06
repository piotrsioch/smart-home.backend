import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddPirSensorDataInputDto,
  PirSensorDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { AddPirSensorDataCommand } from '../../../application/pir-sensor/commands/add-pir-sensor-data.command';

@Controller()
export class PirSensorController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_PIR_DATA)
  async addPirData(@Payload() payload: AddPirSensorDataInputDto): Promise<PirSensorDto> {
    const { sensorId } = payload;

    const command = new AddPirSensorDataCommand({
      sensorId,
    });

    return await this.commandBus.execute<AddPirSensorDataCommand>(command);
  }
}
