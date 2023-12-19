import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeAlarmStateCommandHandler } from './commands';
import { AlarmListQueryHandler, GetAlarmStateQueryHandler } from './queries';

const CommandHandlers = [ChangeAlarmStateCommandHandler];
const QueryHandlers = [GetAlarmStateQueryHandler, AlarmListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class AlarmModule {}
