import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddSmokeSensorDataInputDto,
  SensorsCommunicationEnum,
  SmokeSensorDto,
} from '@smart-home.backend/libs/common';
import { AddSmokeSensorDataCommand } from '../../../application/smoke-sensor';

@Controller()
export class SmokeSensorController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_SMOKE_DATA)
  async addSmokeData(@Payload() payload: AddSmokeSensorDataInputDto): Promise<SmokeSensorDto> {
    const { sensorId, value } = payload;

    const command = new AddSmokeSensorDataCommand({
      sensorId,
      value,
    });

    return await this.commandBus.execute<AddSmokeSensorDataCommand>(command);
  }
}
