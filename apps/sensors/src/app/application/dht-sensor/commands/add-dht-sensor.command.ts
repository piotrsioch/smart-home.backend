import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../domain/models';
import { IDhtSensorRepository } from '../../contracts';

export class AddDhtSensorCommandInput {
  temperature: string;
  humidity: string;
}

export class AddDhtSensorCommand implements ICommand {
  constructor(public readonly input: AddDhtSensorCommandInput) {}
}

@CommandHandler(AddDhtSensorCommand)
export class AddDhtSensorCommandHandler implements ICommandHandler<AddDhtSensorCommand, DhtSensor> {
  constructor(
    private readonly dhtSensorRepository: IDhtSensorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddDhtSensorCommand): Promise<DhtSensor> {
    const { temperature, humidity } = command.input;

    const model = this.publisher.mergeClassContext(DhtSensor);

    const sensor = model.create({
      temperature,
      humidity,
    });

    await this.dhtSensorRepository.add(sensor);

    return sensor;
  }
}
