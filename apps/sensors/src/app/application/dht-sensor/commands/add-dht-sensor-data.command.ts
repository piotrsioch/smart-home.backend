import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../domain/models';
import { IDhtSensorRepository } from '../../contracts';

export class AddDhtSensorCommandInput {
  temperature: string;
  humidity: string;
  sensorId: string;
}

export class AddDhtSensorDataCommand implements ICommand {
  constructor(public readonly input: AddDhtSensorCommandInput) {}
}

@CommandHandler(AddDhtSensorDataCommand)
export class AddDhtSensorDataCommandHandler
  implements ICommandHandler<AddDhtSensorDataCommand, DhtSensor>
{
  constructor(
    private readonly dhtSensorRepository: IDhtSensorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddDhtSensorDataCommand): Promise<DhtSensor> {
    const { temperature, humidity, sensorId } = command.input;

    const model = this.publisher.mergeClassContext(DhtSensor);

    const sensor = model.create({
      temperature,
      humidity,
      sensorId,
    });

    await this.dhtSensorRepository.add(sensor);

    return sensor;
  }
}
