import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../domain/models';
import { IDhtSensorRepository, ISensorRepository } from '../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

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
    private readonly sensorRepository: ISensorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddDhtSensorDataCommand): Promise<DhtSensor> {
    const { temperature, humidity, sensorId } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

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
