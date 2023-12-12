import {
  NotificationsOrderFieldEnum,
  PaginationOptionsInputDto,
} from '@smart-home.backend/libs/common';

export const searchFields = ['sensorId', 'createdAt', '_id', 'location'];

export class NotificationListQueryInput extends PaginationOptionsInputDto {
  orderField?: NotificationsOrderFieldEnum;
}
