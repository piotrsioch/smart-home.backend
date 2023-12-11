import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddSmokeSensorDataCommandHandler } from './commands';
import { SmokeSensorListQueryHandler } from './queries';
import { CriticalValueDetectedHandler } from './handlers';
import { CustomClientModule } from '@smart-home.backend/libs/common';

const CommandHandlers = [AddSmokeSensorDataCommandHandler];
const QueryHandlers = [SmokeSensorListQueryHandler];
const EventHandlers = [CriticalValueDetectedHandler];

@Module({
  imports: [CustomClientModule, PersistenceModule, CqrsModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class SmokeSensorModule {}
