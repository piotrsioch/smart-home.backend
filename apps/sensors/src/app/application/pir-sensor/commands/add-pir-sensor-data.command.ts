import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { PirSensor } from '../../../domain/models';
import { IPirSensorRepository, ISensorRepository } from '../../contracts';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export class AddPirSensorDataCommandInput {
  sensorId: string;
}

export class AddPirSensorDataCommand implements ICommand {
  constructor(public readonly input: AddPirSensorDataCommandInput) {}
}

@CommandHandler(AddPirSensorDataCommand)
export class AddPirSensorDataCommandHandler
  implements ICommandHandler<AddPirSensorDataCommand, PirSensor>
{
  constructor(
    private readonly sensorRepository: ISensorRepository,
    private readonly pirSensorRepository: IPirSensorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddPirSensorDataCommand): Promise<PirSensor> {
    const { sensorId } = command.input;

    const existingSensor = await this.sensorRepository.findOneById(sensorId);

    if (!existingSensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    const model = this.publisher.mergeClassContext(PirSensor);

    const sensor = model.create({
      sensorId,
    });

    await this.pirSensorRepository.add(sensor);

    return sensor;
  }
}
