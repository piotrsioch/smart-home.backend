import { Module } from '@nestjs/common';
import { NotifyServiceModule } from '../../infrastructure/notify-service';
import {
  SendNotificationCommandHandler,
  MarkNotificationAsReadCommandHandler,
  DeleteNotificationCommandHandler,
  CreateNotificationCommandHandler,
} from './commands';
import { PersistenceModule } from '../../infrastructure/persistence/persistence.module';
import { GetNotificationByIdQueryHandler, NotificationListQueryHandler } from './queries';
import { GetUnreadNotificationsQueryHandler } from './queries/get-unread-notifications';

const CommandHandlers = [
  SendNotificationCommandHandler,
  MarkNotificationAsReadCommandHandler,
  DeleteNotificationCommandHandler,
  CreateNotificationCommandHandler,
];
const QueryHandlers = [
  GetNotificationByIdQueryHandler,
  NotificationListQueryHandler,
  GetUnreadNotificationsQueryHandler,
];
const EventHandlers = [];

@Module({
  imports: [NotifyServiceModule, PersistenceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class NotificationModule {}
