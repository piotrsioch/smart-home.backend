import {
  PirSensorMovementDetectedEventDto,
  SensorEventPatternEnum,
  ServiceEnum,
} from '@smart-home.backend/libs/common';

export class PirSensorMoveDetectedInfraEvent {
  readonly receivers: ServiceEnum[] = [ServiceEnum.NOTIFICATIONS];
  readonly pattern = SensorEventPatternEnum.PIR_SENSOR_MOVEMENT_DETECTED;

  constructor(readonly data: PirSensorMovementDetectedEventDto) {}
}
