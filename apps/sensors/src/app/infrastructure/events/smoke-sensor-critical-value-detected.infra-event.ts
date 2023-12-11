import {
  SensorEventPatternEnum,
  ServiceEnum,
  SmokeSensorCriticalValueDetectedEventDto,
} from '@smart-home.backend/libs/common';

export class SmokeSensorCriticalValueDetectedInfraEvent {
  readonly receivers: ServiceEnum[] = [ServiceEnum.NOTIFICATIONS];
  readonly pattern = SensorEventPatternEnum.SMOKE_SENSOR_CRITICAL_VALUE_DETECTED;

  constructor(readonly data: SmokeSensorCriticalValueDetectedEventDto) {}
}
