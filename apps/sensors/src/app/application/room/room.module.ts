import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { GetRoomByIdQueryHandler } from './queries/get-room-by-id';
import { RoomListQueryHandler } from './queries/room-list';

const CommandHandlers = [];
const QueryHandlers = [RoomListQueryHandler, GetRoomByIdQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class RoomModule {}
