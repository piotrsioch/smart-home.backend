import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomClientProxy } from '@smart-home.backend/libs/common';
import { SmokeSensorCriticalValueDetectedInfraEvent } from '../../../infrastructure/events';
import { SmokeSensorCriticalValueDetectedDomainEvent } from '../../../domain/events/smoke-sensor-critical-value-detected-domain.event';

@EventsHandler(SmokeSensorCriticalValueDetectedDomainEvent)
export class CriticalValueDetectedHandler
  implements IEventHandler<SmokeSensorCriticalValueDetectedDomainEvent>
{
  constructor(private readonly client: CustomClientProxy) {}

  async handle(event: SmokeSensorCriticalValueDetectedDomainEvent): Promise<void> {
    this.client.emit(
      new SmokeSensorCriticalValueDetectedInfraEvent({
        sensorId: event.smokeSensor.sensorId,
      }),
    );
  }
}
