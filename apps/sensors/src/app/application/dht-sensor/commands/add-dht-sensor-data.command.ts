import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../domain/models';
import { IDhtSensorRepository } from '../../contracts';
import { IPaginationOptions, SortOrder } from '@smart-home.backend/libs/common';

export class AddDhtSensorDataCommandInput {
  temperature: number;
  humidity: number;
  sensorId: string;
}

export class AddDhtSensorDataCommand implements ICommand {
  constructor(public readonly input: AddDhtSensorDataCommandInput) {}
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
