import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Notification } from '../../../../domain';
import { INotificationRepository } from '../../../contracts/repositories';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type GetNotificationByIdQueryInput = {
  id: string;
};

export class GetNotificationByIdQuery implements IQuery {
  constructor(public readonly input: GetNotificationByIdQueryInput) {}
}

@QueryHandler(GetNotificationByIdQuery)
export class GetNotificationByIdQueryHandler
  implements IQueryHandler<GetNotificationByIdQuery, Notification>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(query: GetNotificationByIdQuery): Promise<Notification> {
    const { id } = query.input;

    const sensor = await this.notificationRepository.findOneById(id);

    if (!sensor) {
      throw new CustomRpcException('Notification with given id not found', ErrorCodeEnum.NOT_FOUND);
    }

    return sensor;
  }
}
