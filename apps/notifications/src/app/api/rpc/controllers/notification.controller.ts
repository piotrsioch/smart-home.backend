import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GetNotificationByIdInputDto,
  MarkNotificationAsReadInputDto,
  NotificationDto,
  NotificationListInputDto,
  NotificationsCommunicationEnum,
  PaginationOutput,
} from '@smart-home.backend/libs/common';
import {
  GetNotificationByIdQuery,
  NotificationListQuery,
} from '../../../application/notification/queries';
import { MarkNotificationAsReadCommand } from '../../../application/notification/commands';

@Controller()
export class NotificationController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @MessagePattern(NotificationsCommunicationEnum.MARK_NOTIFICATION_AS_READ)
  async markNotificationAsRead(
    @Payload() payload: MarkNotificationAsReadInputDto,
  ): Promise<NotificationDto> {
    const { id, state } = payload;

    const command = new MarkNotificationAsReadCommand({
      id,
      state,
    });

    return await this.commandBus.execute<MarkNotificationAsReadCommand>(command);
  }

  @MessagePattern(NotificationsCommunicationEnum.GET_NOTIFICATION_BY_ID)
  async getNotificationById(
    @Payload() payload: GetNotificationByIdInputDto,
  ): Promise<NotificationDto> {
    const { id } = payload;

    const query = new GetNotificationByIdQuery({
      id,
    });

    return await this.queryBus.execute<GetNotificationByIdQuery>(query);
  }

  @MessagePattern(NotificationsCommunicationEnum.NOTIFICATION_LIST)
  async notificationList(
    @Payload() payload: NotificationListInputDto,
  ): Promise<PaginationOutput<NotificationDto>> {
    const { page, limit, orderField, orderDirection, search } = payload;

    const query = new NotificationListQuery({
      page,
      limit,
      orderField: orderField ?? null,
      orderDirection: orderDirection ?? null,
      search: search ?? null,
    });

    return await this.queryBus.execute<NotificationListQuery>(query);
  }
}
