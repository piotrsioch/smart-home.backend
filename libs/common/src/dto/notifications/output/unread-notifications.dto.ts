import { NotificationDto } from './notification.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UnreadNotificationsDto {
  @ApiProperty({ type: [NotificationDto] })
  notifications: NotificationDto[];
}
