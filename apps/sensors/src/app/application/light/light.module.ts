import { Module } from '@nestjs/common';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChangeLightStateCommandHandler } from './commands/change-light-state';
import { GetLightStateQueryHandler } from './queries';

const CommandHandlers = [ChangeLightStateCommandHandler];
const QueryHandlers = [GetLightStateQueryHandler];
const EventHandlers = [];

@Module({
  imports: [CqrsModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class LightModule {}
