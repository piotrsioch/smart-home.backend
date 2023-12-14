import { IsOptional, IsString } from 'class-validator';
import { PaginationOptionsInputDto } from '../../../../dto/common/pagination-options.input.dto';
import { NotificationsOrderFieldEnum } from '../../../../domain/enums/notifications/notifications-order-field.enum';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationListInputDto extends PaginationOptionsInputDto {
  @ApiProperty({ required: false, enum: NotificationsOrderFieldEnum })
  @IsString()
  @IsOptional()
  orderField?: NotificationsOrderFieldEnum;
}
