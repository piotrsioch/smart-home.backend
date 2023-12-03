import { AddDhtSensorCommandHandler } from './commands';
import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';

const CommandHandlers = [AddDhtSensorCommandHandler];
const QueryHandlers = [];
const EventHandlers = [];

@Module({
  imports: [PersistenceModule, CqrsModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class DhtSensorModule {}
