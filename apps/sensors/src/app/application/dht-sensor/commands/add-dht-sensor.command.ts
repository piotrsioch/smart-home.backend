import { CommandHandler, EventPublisher, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { DhtSensor } from '../../../domain/models';
import { IDhtSensorRepository } from '../../contracts';
import { InjectRepository } from "@nestjs/typeorm";
import { DhtSensorEntity } from "../../../infrastructure/persistence/type-orm/entities/dht-sensor.entity";
import { Repository } from "typeorm";

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
    console.log('In execugte in adddhtsensorcommandhandler');
    const { temperature, humidity } = command.input;

    const model = this.publisher.mergeClassContext(DhtSensor);

    const sensor = model.create({
      temperature,
      humidity,
    });

    console.log('before dhtSensorRepo add');
    console.log(this.dhtSensorRepository);

    await this.dhtSensorRepository.save(sensor);

    return sensor;
  }
}
