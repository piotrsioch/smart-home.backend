import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Notification } from '../../../../domain';
import { INotificationRepository } from '../../../contracts/repositories';
import { CustomRpcException, ErrorCodeEnum } from '@smart-home.backend/libs/common';

export type MarkNotificationAsReadCommandInput = {
  id: string;
  state?: boolean;
};

export class MarkNotificationAsReadCommand implements ICommand {
  constructor(public readonly input: MarkNotificationAsReadCommandInput) {}
}

@CommandHandler(MarkNotificationAsReadCommand)
export class MarkNotificationAsReadCommandHandler
  implements ICommandHandler<MarkNotificationAsReadCommand, Notification>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(command: MarkNotificationAsReadCommand): Promise<Notification> {
    const { id, state } = command.input;

    const notification = await this.notificationRepository.findOneById(id);

    if (!notification) {
      throw new CustomRpcException(
        'Notification with given id does not exist',
        ErrorCodeEnum.NOT_FOUND,
      );
    }

    if (state !== undefined && state !== null) {
      notification.isRead = state;
    } else {
      notification.isRead = true;
    }

    await this.notificationRepository.update(notification._id, notification);

    return notification;
  }
}
