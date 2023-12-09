import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddPirSensorDataCommandHandler } from './commands';
import { PirSensorListQueryHandler } from './queries';

const CommandHandlers = [AddPirSensorDataCommandHandler];
const QueryHandlers = [PirSensorListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class PirSensorModule {}
