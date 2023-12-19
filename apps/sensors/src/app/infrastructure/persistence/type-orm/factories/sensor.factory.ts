import { Injectable } from '@nestjs/common';
import { SensorEntity } from '../entities/sensor.entity';
import { Sensor } from '../../../../domain/models/sensors';
import { faker } from '@faker-js/faker';
import { SensorTypeEnum } from '@smart-home.backend/libs/common';

@Injectable()
export class SensorFactory {
  create(): SensorEntity {
    const enumValues = Object.values(SensorTypeEnum);

    const randomIndex = Math.floor(Math.random() * enumValues.length);

    const sensor = new Sensor();

    sensor._id = faker.string.alphanumeric({ length: 8 });
    sensor.type = enumValues[randomIndex];
    sensor.name = faker.string.alpha({ length: 8 });
    sensor.location = faker.string.alpha({ length: 8 });
    sensor.roomId = null;

    return sensor;
  }
}
