import { PirSensorMovementDetectedDomainEvent } from '../../../../domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomClientProxy } from '@smart-home.backend/libs/common';
import { PirSensorMoveDetectedInfraEvent } from '../../../../infrastructure/events';

@EventsHandler(PirSensorMovementDetectedDomainEvent)
export class MovementDetectedHandler
  implements IEventHandler<PirSensorMovementDetectedDomainEvent>
{
  constructor(private readonly client: CustomClientProxy) {}

  async handle(event: PirSensorMovementDetectedDomainEvent): Promise<void> {
    this.client.emit(
      new PirSensorMoveDetectedInfraEvent({
        sensorId: event.pirSensor.sensorId,
      }),
    );
  }
}
