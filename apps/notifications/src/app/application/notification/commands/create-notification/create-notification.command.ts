import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { Notification } from '../../../../domain';
import { INotificationRepository } from '../../../contracts/repositories';

export type CreateNotificationCommandInput = {
  phoneNumber: string;
  message: string;
  sensorId: string;
  name: string;
};

export class CreateNotificationCommand implements ICommand {
  constructor(public readonly input: CreateNotificationCommandInput) {}
}

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationCommandHandler
  implements ICommandHandler<CreateNotificationCommand, Notification>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(command: CreateNotificationCommand): Promise<Notification> {
    const { phoneNumber, message, sensorId, name } = command.input;

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
