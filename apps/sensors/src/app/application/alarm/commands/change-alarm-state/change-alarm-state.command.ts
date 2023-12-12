import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Alarm } from '../../../../domain/models/alarm';
import { IAlarmRepository, ISensorRepository } from '../../../contracts';
import { AlarmStateEnum, CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type ChangeAlarmStateCommandInput = {
  sensorId: string;
  state?: AlarmStateEnum;
};

export class ChangeAlarmStateCommand implements ICommand {
  constructor(public readonly input: ChangeAlarmStateCommandInput) {}
}

@CommandHandler(ChangeAlarmStateCommand)
export class ChangeAlarmStateCommandHandler
  implements ICommandHandler<ChangeAlarmStateCommand, Alarm>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly alarmRepository: IAlarmRepository,
  ) {}

  async execute(command: ChangeAlarmStateCommand): Promise<Alarm> {
    const { sensorId, state } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    const dataToSave = Alarm.create({
      sensorId,
      state,
    });

    await this.alarmRepository.add(dataToSave);

    return dataToSave;
  }
}
