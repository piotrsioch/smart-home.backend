import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../../../application/notification/commands';
import {
  PirSensorMovementDetectedEventDto,
  SensorEventPatternEnum,
  SmokeSensorCriticalValueDetectedEventDto,
} from '@smart-home.backend/libs/common';
import { createNotificationMessage, NotificationTypeEnum } from '../../../../assets';

@Controller()
export class SensorsController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(SensorEventPatternEnum.PIR_SENSOR_MOVEMENT_DETECTED)
  async pirSensor(@Payload() payload: PirSensorMovementDetectedEventDto) {
    const { sensorId } = payload;

    const date = new Date().toDateString();

    const message = await createNotificationMessage({
      type: NotificationTypeEnum.PIR_SENSOR,
      sensorName: sensorId,
      date,
    });

    const command = new SendNotificationCommand({
      phoneNumber: process.env.USER_PHONE_NUMBER,
      message,
      sensorId,
      name: NotificationTypeEnum.PIR_SENSOR,
    });

    await this.commandBus.execute(command);
  }

  @EventPattern(SensorEventPatternEnum.SMOKE_SENSOR_CRITICAL_VALUE_DETECTED)
  async smokeSensor(@Payload() payload: SmokeSensorCriticalValueDetectedEventDto) {
    const { sensorId } = payload;

    const date = new Date().toDateString();

    const message = await createNotificationMessage({
      type: NotificationTypeEnum.SMOKE_SENSOR,
      sensorName: sensorId,
      date,
    });

    const command = new SendNotificationCommand({
      phoneNumber: process.env.USER_PHONE_NUMBER,
      message,
      sensorId,
      name: NotificationTypeEnum.SMOKE_SENSOR,
    });

    await this.commandBus.execute(command);
  }
}
