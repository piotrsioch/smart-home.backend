import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationOutput } from '@smart-home.backend/libs/common';
import { NotificationListQueryInput, searchFields } from './notification-list.types';
import { INotificationRepository } from '../../../contracts/repositories';
import { Notification } from '../../../../domain';

export class NotificationListQuery implements IQuery {
  constructor(public readonly input: NotificationListQueryInput) {}
}

@QueryHandler(NotificationListQuery)
export class NotificationListQueryHandler
  implements IQueryHandler<NotificationListQuery, PaginationOutput<Notification>>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(query: NotificationListQuery): Promise<PaginationOutput<Notification>> {
    const { orderDirection, search, orderField, page, limit } = query.input;

    return await this.notificationRepository.getPaginatedData({
      orderDirection,
      search,
      orderField,
      searchFields,
      page,
      limit,
    });
  }
}
