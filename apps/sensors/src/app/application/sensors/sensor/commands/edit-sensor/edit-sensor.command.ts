import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CustomRpcException, ErrorCodeEnum, SensorTypeEnum } from '@smart-home.backend/libs/common';
import { Sensor } from '../../../../../domain/models/sensors';
import { ISensorRepository } from '../../../contracts';

export type EditSensorCommandInput = {
  id: string;
  type?: SensorTypeEnum;
  name?: string;
  location?: string;
};

export class EditSensorCommand implements ICommand {
  constructor(public readonly input: EditSensorCommandInput) {}
}

@CommandHandler(EditSensorCommand)
export class EditSensorCommandHandler implements ICommandHandler<EditSensorCommand, Sensor> {
  constructor(private readonly sensorRepository: ISensorRepository) {}

  async execute(command: EditSensorCommand): Promise<Sensor> {
    const { id, type, name, location } = command.input;

    const sensor = await this.sensorRepository.findOneById(id);

    if (!sensor) {
      throw new CustomRpcException('Sensor with given id does not exist', ErrorCodeEnum.NOT_FOUND);
    }

    if (!(type || name || location)) {
      throw new CustomRpcException('No data passed', ErrorCodeEnum.BAD_REQUEST);
    }

    sensor.type = type ?? sensor.type;
    sensor.name = name ?? sensor.name;
    sensor.location = location ?? sensor.location;

    await this.sensorRepository.update(sensor._id, sensor);

    return sensor;
  }
}
