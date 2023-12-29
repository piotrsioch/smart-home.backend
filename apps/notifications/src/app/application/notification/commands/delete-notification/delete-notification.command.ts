import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CustomRpcException, ErrorCodeEnum, SuccessDto } from '@smart-home.backend/libs/common';
import { INotificationRepository } from '../../../contracts/repositories';

export type DeleteNotificationCommandInput = {
  id: string;
};

export class DeleteNotificationCommand implements ICommand {
  constructor(public readonly input: DeleteNotificationCommandInput) {}
}

@CommandHandler(DeleteNotificationCommand)
export class DeleteNotificationCommandHandler
  implements ICommandHandler<DeleteNotificationCommand, SuccessDto>
{
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(command: DeleteNotificationCommand): Promise<SuccessDto> {
    const { id } = command.input;

    const notification = await this.notificationRepository.findOneById(id);

    if (!notification) {
      throw new CustomRpcException(
        'Notification with given id does not exist',
        ErrorCodeEnum.NOT_FOUND,
      );
    }

    await this.notificationRepository.remove(notification);

    const dto = new SuccessDto();

    dto.success = true;

    return dto;
  }
}
