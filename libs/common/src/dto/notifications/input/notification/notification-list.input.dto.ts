import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { NotificationsOrderFieldEnum } from '../../../../domain/enums/notifications/notifications-order-field.enum';

export class NotificationListInputDto extends PaginationOptionsInputDto {
  @IsString()
  @IsOptional()
  orderField?: NotificationsOrderFieldEnum;
}
