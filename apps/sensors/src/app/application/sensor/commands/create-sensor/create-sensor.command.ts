import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { SensorTypeEnum } from '@smart-home.backend/libs/common';
import { Sensor } from '../../../../domain/models/sensors';
import { ISensorRepository } from '../../../contracts';
import { RpcException } from '@nestjs/microservices';

export type CreateSensorCommandInput = {
  id: string;
  type: SensorTypeEnum;
  location: string;
  name: string;
};

export class CreateSensorCommand implements ICommand {
  constructor(public readonly input: CreateSensorCommandInput) {}
}

@CommandHandler(CreateSensorCommand)
export class CreateSensorCommandHandler implements ICommandHandler<CreateSensorCommand, Sensor> {
  constructor(private readonly sensorRepository: ISensorRepository) {}

  async execute(command: CreateSensorCommand): Promise<Sensor> {
    const { id, type, location, name } = command.input;

    const sensorWithGivenId = await this.sensorRepository.findOneById(id);

    if (sensorWithGivenId) {
      throw new RpcException('Sensor with given id already exists!');
    }

    const sensor = Sensor.create({
      id,
      type,
      location,
      name,
    });

    await this.sensorRepository.add(sensor);

    return sensor;
  }
}
