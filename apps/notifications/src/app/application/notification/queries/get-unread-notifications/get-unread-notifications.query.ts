import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { INotificationRepository } from '../../../contracts/repositories';
import { Notification } from '../../../../domain';

export class GetUnreadNotificationsQuery implements IQuery {}

@QueryHandler(GetUnreadNotificationsQuery)
export class GetUnreadNotificationsQueryHandler
  implements IQueryHandler<GetUnreadNotificationsQuery, Notification[]>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(query: GetUnreadNotificationsQuery): Promise<Notification[]> {
    const { items: notifications } = await this.notificationRepository.getPaginatedData({
      page: 0,
      limit: 100,
    });

    return notifications.filter((notification) => notification.isRead === false);
  }
}
