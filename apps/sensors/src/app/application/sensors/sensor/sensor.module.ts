import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSensorCommandHandler } from './commands';
import { GetSensorByIdQueryHandler, SensorListQueryHandler } from './queries';

const CommandHandlers = [CreateSensorCommandHandler];
const QueryHandlers = [GetSensorByIdQueryHandler, SensorListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class SensorModule {}
