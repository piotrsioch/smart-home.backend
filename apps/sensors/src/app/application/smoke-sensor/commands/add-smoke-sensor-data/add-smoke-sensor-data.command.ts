import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { SmokeSensor } from '../../../../domain';
import { ISmokeSensorRepository } from '../../../contracts';
import { ISensorRepository } from '../../../contracts';

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
      throw new RpcException('Sensor with given id does not exist!');
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
