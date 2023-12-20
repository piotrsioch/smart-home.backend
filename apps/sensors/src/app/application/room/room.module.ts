import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRoomByIdQueryHandler, RoomListQueryHandler } from './queries';

const CommandHandlers = [];
const QueryHandlers = [RoomListQueryHandler, GetRoomByIdQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class RoomModule {}
