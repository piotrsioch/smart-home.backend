import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Notification } from '../../../../domain';
import { INotifyService } from '@smart-home.backend/libs/common';
import { INotificationRepository } from '../../../contracts/repositories';

export type SendNotificationCommandInput = {
  phoneNumber: string;
  message: string;
  sensorId: string;
  name: string;
};

export class SendNotificationCommand implements ICommand {
  constructor(public readonly input: SendNotificationCommandInput) {}
}

@CommandHandler(SendNotificationCommand)
export class SendNotificationCommandHandler
  implements ICommandHandler<SendNotificationCommand, Notification>
{
  constructor(
    private readonly notifyService: INotifyService,
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async execute(command: SendNotificationCommand): Promise<Notification> {
    const { phoneNumber, message, sensorId, name } = command.input;

    await this.notifyService.sendMessage({
      phoneNumber,
      message,
    });

    const notification = Notification.create({
      receiver: phoneNumber,
      message,
      sensorId,
      name,
    });

    await this.notificationRepository.add(notification);

    return notification;
  }
}
