import { PirSensor } from '../models';

export class PirSensorMoveDetectedDomainEvent {
  constructor(public pirSensor: PirSensor) {}
}
