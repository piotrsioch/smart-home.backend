import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AlarmDto, SensorsCommunicationEnum } from '@smart-home.backend/libs/common';
import { ChangeAlarmStateInputDto } from '@smart-home.backend/libs/common/src/dto/sensors/input/alarm';
import { ChangeAlarmStateCommand } from '../../../application/alarm/commands';

@Controller()
export class AlarmController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(SensorsCommunicationEnum.CHANGE_ALARM_STATE)
  async changeAlarmState(@Payload() payload: ChangeAlarmStateInputDto): Promise<AlarmDto> {
    const { desiredState, sensorId } = payload;

    const command = new ChangeAlarmStateCommand({
      desiredState: desiredState ?? null,
      sensorId,
    });

    return await this.commandBus.execute<ChangeAlarmStateCommand>(command);
  }
}
