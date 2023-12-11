import { SmokeSensor } from '../models';

export class SmokeSensorCriticalValueDetectedDomainEvent {
  constructor(public readonly smokeSensor: SmokeSensor) {}
}
