import { Injectable } from '@nestjs/common';
import { DhtSensorEntity } from '../entities/dht-sensor.entity';
// import { faker } from '@faker-js/faker';

@Injectable()
export class DhtSensorFactory {
  create(): DhtSensorEntity {
    const sensor = new DhtSensorEntity();
    // sensor.temperature = faker.number.int({ min: -30, max: 60 }).toString();
    // sensor.humidity = faker.number.int({ min: 0, max: 100 }).toString();
    sensor.temperature = '69';
    sensor.humidity = '69';
    return sensor;
  }
}
