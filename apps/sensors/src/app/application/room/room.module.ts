import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';

const CommandHandlers = [];
const QueryHandlers = [];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class RoomModule {}
