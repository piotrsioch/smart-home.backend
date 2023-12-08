import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddSmokeSensorDataCommandHandler } from './commands';
import { SmokeSensorListQueryHandler } from './queries';

const CommandHandlers = [AddSmokeSensorDataCommandHandler];
const QueryHandlers = [SmokeSensorListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class SmokeSensorModule {}
