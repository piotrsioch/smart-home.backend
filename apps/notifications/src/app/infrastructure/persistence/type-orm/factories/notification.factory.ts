import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { NotificationEntity } from '../entities/notification.entity';
import { Notification } from '../../../../domain';

@Injectable()
export class NotificationFactory {
  create(): NotificationEntity {
    const sensor = new Notification();

    sensor.create();

    sensor.message = faker.lorem.text();
    sensor.sensorId = faker.string.uuid();
    sensor.receiver = faker.phone.number();
    sensor.name = faker.lorem.word();
    sensor.isRead = false;

    return sensor;
  }
}
