import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Alarm } from '../../../../domain/models/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmStateEnum } from '@smart-home.backend/libs/common';

@Injectable()
export class AlarmFactory {
  create(): AlarmEntity {
    const sensor = new Alarm();

    sensor.create();

    sensor.sensorId = faker.string.uuid();

    const enumValues = Object.values(AlarmStateEnum) as AlarmStateEnum[];

    const randomState = faker.helpers.arrayElement(enumValues);

    sensor.state = randomState;

    return sensor;
  }
}
