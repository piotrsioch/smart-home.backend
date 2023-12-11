import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { SendNotificationCommand } from '../../../application/notification/commands';
import {
  PirSensorMovementDetectedEventDto,
  SensorEventPatternEnum,
  SmokeSensorCriticalValueDetectedEventDto,
} from '@smart-home.backend/libs/common';

@Controller()
export class SensorsController {
  constructor(private readonly commandBus: CommandBus) {}

  @EventPattern(SensorEventPatternEnum.PIR_SENSOR_MOVEMENT_DETECTED)
  async pirSensor(@Payload() payload: PirSensorMovementDetectedEventDto) {
    const command = new SendNotificationCommand({
      phoneNumber: process.env.USER_PHONE_NUMBER,
      message: 'test',
      sensorId: '555',
      name: '2323',
    });

    // await this.commandBus.execute(command);
    console.log('Pir sensor value detected handled');
    console.log(payload);
  }

  @EventPattern(SensorEventPatternEnum.SMOKE_SENSOR_CRITICAL_VALUE_DETECTED)
  async smokeSensor(@Payload() payload: SmokeSensorCriticalValueDetectedEventDto) {
    console.log('Smoke sensor value detected handled');
  }
}
