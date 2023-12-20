import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRoomByIdQueryHandler, RoomListQueryHandler } from './queries';
import { AssignSensorToRoomCommandHandler } from './commands/assign-sensor-to-room';
import { CreateRoomCommandHandler } from './commands/create-room';
import { DeleteRoomCommandHandler } from './commands/delete-room';
import { RemoveSensorFromRoomCommandHandler } from './commands';

const CommandHandlers = [
  AssignSensorToRoomCommandHandler,
  CreateRoomCommandHandler,
  DeleteRoomCommandHandler,
  RemoveSensorFromRoomCommandHandler,
];
const QueryHandlers = [RoomListQueryHandler, GetRoomByIdQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class RoomModule {}
