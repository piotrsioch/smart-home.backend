import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { SmokeSensor } from '../../../../domain';
import { ISmokeSensorRepository } from '../../../contracts';
import { ISensorRepository } from '../../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export class AddSmokeSensorDataCommandInput {
  sensorId: string;
  value: number;
}

export class AddSmokeSensorDataCommand implements ICommand {
  constructor(public readonly input: AddSmokeSensorDataCommandInput) {}
}

@CommandHandler(AddSmokeSensorDataCommand)
export class AddSmokeSensorDataCommandHandler
  implements ICommandHandler<AddSmokeSensorDataCommand, SmokeSensor>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly smokeSensorRepository: ISmokeSensorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddSmokeSensorDataCommand): Promise<SmokeSensor> {
    const { sensorId, value } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    const model = this.publisher.mergeClassContext(SmokeSensor);

    const sensor = model.create({
      sensorId,
      value,
    });

    await this.smokeSensorRepository.add(sensor);

    return sensor;
  }
}
