import { SmokeSensor } from '../models';

export class SmokeSensorCriticalValueDomainEvent {
  constructor(public readonly smokeSensor: SmokeSensor) {}
}
