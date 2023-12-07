import { AddDhtSensorDataCommandHandler } from './commands';
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DhtSensorListQueryHandler, GetLatestDhtDataQueryHandler } from './queries';

const CommandHandlers = [AddDhtSensorDataCommandHandler];
const QueryHandlers = [DhtSensorListQueryHandler, GetLatestDhtDataQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class DhtSensorModule {}
