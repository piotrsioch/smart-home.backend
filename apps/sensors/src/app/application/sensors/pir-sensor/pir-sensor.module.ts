import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddPirSensorDataCommandHandler } from './commands';
import { PirSensorListQueryHandler } from './queries';
import { MovementDetectedHandler } from './handlers/movement-detected.handler';
import { CustomClientModule } from '@smart-home.backend/libs/common';

const CommandHandlers = [AddPirSensorDataCommandHandler];
const QueryHandlers = [PirSensorListQueryHandler];
const EventHandlers = [MovementDetectedHandler];

@Module({
  imports: [CqrsModule, PersistenceModule, CustomClientModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class PirSensorModule {}
