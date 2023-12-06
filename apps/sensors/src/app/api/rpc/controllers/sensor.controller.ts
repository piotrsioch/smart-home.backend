import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateSensorInputDto,
  SensorDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { CreateSensorCommand } from '../../../application/sensor';

@Controller()
export class SensorController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.CREATE_SENSOR)
  async addDhtData(@Payload() payload: CreateSensorInputDto): Promise<SensorDto> {
    const { id, type, name, location } = payload;

    const command = new CreateSensorCommand({
      id,
      type,
      name,
      location,
    });

    return await this.commandBus.execute<CreateSensorCommand>(command);
  }
}
