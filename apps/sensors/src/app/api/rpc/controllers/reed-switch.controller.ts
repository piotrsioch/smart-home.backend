import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AddReedSwitchDataInputDto,
  ReedSwitchDto,
  SensorsCommunicationEnum,
} from '@smart-home.backend/libs/common';
import { AddReedSwitchDataCommand } from '../../../application/reed-switch/commands/add-reed-switch-data';

@Controller()
export class ReedSwitchController {
  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern(SensorsCommunicationEnum.ADD_REED_SWITCH_DATA)
  async addReedSwitchData(@Payload() payload: AddReedSwitchDataInputDto): Promise<ReedSwitchDto> {
    const { sensorId, isOpened } = payload;

    const command = new AddReedSwitchDataCommand({
      sensorId,
      isOpened,
    });

    return await this.commandBus.execute<AddReedSwitchDataCommand>(command);
  }
}
