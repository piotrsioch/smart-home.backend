import { Injectable } from '@nestjs/common';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
import { faker } from '@faker-js/faker';
import { DhtSensor } from '../../../../domain/models';

@Injectable()
export class DhtSensorFactory {
  create(): DhtSensorEntity {
    const sensor = new DhtSensor();

    sensor.create();

    sensor.temperature = faker.number.int({ min: -30, max: 60 });
    sensor.humidity = faker.number.int({ min: 0, max: 100 });
    sensor.sensorId = faker.string.uuid();

    return sensor;
  }
}
