import { PirSensor } from '../models';

export class PirSensorMovementDetectedDomainEvent {
  constructor(public pirSensor: PirSensor) {}
}
