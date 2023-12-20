import { Injectable } from '@nestjs/common';
import { PirSensor } from '../../../../domain';
import { PirSensorEntity } from '../entities/pir-sensor.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class PirSensorFactory {
  create(): PirSensorEntity {
    const sensor = new PirSensor();

    sensor.create();

    sensor.sensorId = faker.string.uuid();

    return sensor;
  }
}
