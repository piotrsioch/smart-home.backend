import { Injectable } from '@nestjs/common';
import { SmokeSensor } from '../../../../domain/models';
import { faker } from '@faker-js/faker';
import { SmokeSensorEntity } from '../entities/smoke-sensor.entity';

@Injectable()
export class SmokeSensorFactory {
  create(): SmokeSensorEntity {
    const sensor = new SmokeSensor();

    sensor.create();

    sensor.sensorId = faker.string.uuid();
    sensor.value = faker.number.int({ min: 300, max: 4000 });

    return sensor;
  }
}
