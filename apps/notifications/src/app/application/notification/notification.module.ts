import { Module } from '@nestjs/common';
import { NotifyServiceModule } from '../../infrastructure/notify-service';
import { SendNotificationCommandHandler } from './commands';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';

const CommandHandlers = [SendNotificationCommandHandler];
const QueryHandlers = [];
const EventHandlers = [];

@Module({
  imports: [NotifyServiceModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class NotificationModule {}
