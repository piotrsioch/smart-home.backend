import { Module } from '@nestjs/common';
import { NotifyServiceModule } from '../../infrastructure/notify-service';
import { SendNotificationCommandHandler } from './commands';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { GetNotificationByIdQueryHandler, NotificationListQueryHandler } from './queries';

const CommandHandlers = [SendNotificationCommandHandler];
const QueryHandlers = [GetNotificationByIdQueryHandler, NotificationListQueryHandler];
const EventHandlers = [];

@Module({
  imports: [NotifyServiceModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class NotificationModule {}
