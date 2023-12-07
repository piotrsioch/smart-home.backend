import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Light } from '../../../../domain';
import { LightEntity } from '../entities/light.entity';

@Injectable()
export class LightFactory {
  create(): LightEntity {
    const sensor = new Light();

    sensor.create();

    sensor.sensorId = faker.string.uuid();
    sensor.isOn = faker.number.int({ min: 1, max: 2 }) % 2 === 0;

    return sensor;
  }
}
