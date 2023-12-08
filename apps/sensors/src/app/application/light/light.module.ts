import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeLightStateCommandHandler } from './commands/change-light-state';
import { GetLightStateQueryHandler, LightListQueryHandler } from './queries';

const CommandHandlers = [ChangeLightStateCommandHandler];
const QueryHandlers = [GetLightStateQueryHandler, LightListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class LightModule {}
