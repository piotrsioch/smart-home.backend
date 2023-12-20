import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ReedSwitchEntity } from '../entities/reed-switch.entity';
import { ReedSwitch } from '../../../../domain';

@Injectable()
export class ReedSwitchFactory {
  create(): ReedSwitchEntity {
    const sensor = new ReedSwitch();

    sensor.create();

    sensor.sensorId = faker.string.uuid();
    sensor.isOpened = faker.number.int({ min: 1, max: 2 }) % 2 === 0;

    return sensor;
  }
}
