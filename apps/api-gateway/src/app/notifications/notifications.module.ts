import { Module } from '@nestjs/common';
import { CustomClientModule, CustomExceptionFilter } from '@smart-home.backend/libs/common';
import { NotificationController } from './notification';

@Module({
  imports: [CustomClientModule],
  controllers: [NotificationController],
  providers: [CustomExceptionFilter],
  exports: [],
})
export class NotificationsModule {}
