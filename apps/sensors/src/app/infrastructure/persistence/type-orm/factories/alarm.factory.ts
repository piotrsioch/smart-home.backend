import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Alarm } from '../../../../domain/models/alarm';
import { AlarmEntity } from '../entities/alarm.entity';

@Injectable()
export class AlarmFactory {
  create(): AlarmEntity {
    const sensor = new Alarm();

    sensor.create();

    sensor.sensorId = faker.string.uuid();
    sensor.isActive = faker.number.int({ min: 1, max: 2 }) % 2 === 0;

    return sensor;
  }
}
