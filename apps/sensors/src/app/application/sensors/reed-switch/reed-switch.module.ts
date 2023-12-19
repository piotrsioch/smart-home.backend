import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { AddReedSwitchDataCommandHandler } from './commands';
import { GetLatestReedSwitchDataQueryHandler, ReedSwitchListQueryHandler } from './queries';

const CommandHandlers = [AddReedSwitchDataCommandHandler];
const QueryHandlers = [ReedSwitchListQueryHandler, GetLatestReedSwitchDataQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class ReedSwitchModule {}
