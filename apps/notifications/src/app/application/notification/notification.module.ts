import { Module } from '@nestjs/common';
import { NotifyServiceModule } from '../../infrastructure/notify-service';

const CommandHandlers = [];
const QueryHandlers = [];
const EventHandlers = [];

@Module({
  imports: [NotifyServiceModule],
  providers: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
  exports: [...QueryHandlers, ...CommandHandlers, ...EventHandlers],
})
export class NotificationModule {}
